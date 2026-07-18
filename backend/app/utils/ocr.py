"""
OCR utilities using EasyOCR.

Provides text extraction from images with lazy model loading
to avoid slow startup times. Supports English, Telugu, and Hindi.
"""

import logging
from typing import Optional

logger = logging.getLogger(__name__)

# Module-level reader instance (lazy loaded)
_reader: Optional[object] = None
_loaded_languages: Optional[list[str]] = None


def _get_reader(languages: list[str] | None = None):
    """
    Get or create the EasyOCR reader instance.

    Lazy-loads the model on first call. If the requested languages differ
    from the currently loaded ones, a new reader is created.

    Args:
        languages: List of language codes (e.g., ['en', 'te', 'hi']).

    Returns:
        An EasyOCR Reader instance.
    """
    global _reader, _loaded_languages

    if languages is None:
        languages = ["en"]

    # Re-create reader if languages have changed
    if _reader is None or set(languages) != set(_loaded_languages or []):
        try:
            import easyocr

            logger.info("Initializing EasyOCR reader with languages: %s", languages)
            _reader = easyocr.Reader(languages, gpu=False)
            _loaded_languages = languages
            logger.info("EasyOCR reader initialized successfully")
        except Exception as e:
            logger.error("Failed to initialize EasyOCR: %s", str(e))
            raise RuntimeError(f"EasyOCR initialization failed: {e}") from e

    return _reader


def extract_text_from_image(
    image_path: str,
    languages: list[str] | None = None,
) -> str:
    """
    Extract text from an image file using EasyOCR.

    Args:
        image_path: Absolute path to the image file.
        languages: List of language codes to use for OCR.
                   Defaults to ['en']. Supports 'en', 'te', 'hi'.

    Returns:
        Extracted text as a single string, with detected text blocks
        joined by newlines.

    Raises:
        FileNotFoundError: If the image file does not exist.
        RuntimeError: If OCR processing fails.
    """
    import os

    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    if languages is None:
        languages = ["en"]

    try:
        reader = _get_reader(languages)
        results = reader.readtext(image_path)

        # Each result is (bbox, text, confidence)
        extracted_lines = [text for _, text, confidence in results if confidence > 0.3]
        extracted_text = "\n".join(extracted_lines)

        logger.info(
            "OCR extracted %d text blocks from %s",
            len(extracted_lines),
            os.path.basename(image_path),
        )
        return extracted_text

    except Exception as e:
        logger.error("OCR failed for %s: %s", image_path, str(e))
        raise RuntimeError(f"OCR processing failed: {e}") from e
