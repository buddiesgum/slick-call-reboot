#!/usr/bin/env bash
# compress.sh -- compress PNG/JPEG to WebP at web-optimized quality
#
# Usage: compress.sh <path-or-dir> [quality] [max-dim]
#   path-or-dir  File, glob, or directory to process (directory = recursive)
#   quality      cwebp quality factor 0-100 (default: 85)
#   max-dim      Maximum pixels on the longer axis (default: 2048)
#                Images already within this bound are NOT resized (no upscaling).
#
# Outputs sibling .webp files alongside the originals.
# Deleting the originals is left to the caller after confirming exit code 0.
#
# Dependencies: cwebp (brew install webp), sips (macOS built-in)
# On Linux replace sips calls with: identify -format '%w %h' "$f"

set -euo pipefail

input="${1:?usage: compress.sh <path-or-dir> [quality] [max-dim]}"
quality="${2:-85}"
max_dim="${3:-2048}"

if ! command -v cwebp >/dev/null 2>&1; then
	echo "cwebp not found. Install with: brew install webp" >&2
	exit 1
fi

shopt -s nullglob nocaseglob

if [[ -d "$input" ]]; then
	# Recurse with find; -iname covers .PNG .Png etc. on case-sensitive FSes
	# Using while-read for bash 3 compatibility (macOS /bin/bash is 3.x)
	files=()
	while IFS= read -r -d '' path; do
		files+=( "$path" )
	done < <(find "$input" \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -type f -print0 | sort -z)
else
	# Word-split intentionally to expand globs passed as a string
	# shellcheck disable=SC2206
	files=( $input )
fi

if (( ${#files[@]} == 0 )); then
	echo "No PNG/JPEG inputs found under: $input" >&2
	exit 1
fi

fails=0
for f in "${files[@]}"; do
	[[ -f "$f" ]] || continue

	w=$(sips -g pixelWidth  "$f" 2>/dev/null | awk '/pixelWidth/{print $2}')
	h=$(sips -g pixelHeight "$f" 2>/dev/null | awk '/pixelHeight/{print $2}')
	out="${f%.*}.webp"

	resize_args=()
	if [[ -n "${w:-}" && -n "${h:-}" ]]; then
		if (( w > max_dim || h > max_dim )); then
			# Resize the longer axis; the other scales proportionally
			if (( w >= h )); then
				resize_args=(-resize "$max_dim" 0)
			else
				resize_args=(-resize 0 "$max_dim")
			fi
		fi
	fi

	if cwebp -q "$quality" "${resize_args[@]+"${resize_args[@]}"}" -mt -quiet "$f" -o "$out" \
		&& [[ -s "$out" ]]; then
		printf '%s\t%s -> %s\n' "$(du -h "$out" | cut -f1)" "$f" "$out"
	else
		echo "FAIL: $f" >&2
		fails=$(( fails + 1 ))
	fi
done

if (( fails > 0 )); then
	echo "$fails file(s) failed — originals not deleted." >&2
	exit 1
fi
