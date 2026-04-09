import sys
try:
    import pypdf
    from pypdf import PdfReader
    reader = PdfReader("PRD_GDG_Frontend.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    with open("prd_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Success with pypdf")
except ImportError:
    try:
        import PyPDF2
        from PyPDF2 import PdfReader
        reader = PdfReader("PRD_GDG_Frontend.pdf")
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open("prd_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Success with PyPDF2")
    except ImportError:
        try:
            import fitz
            doc = fitz.open("PRD_GDG_Frontend.pdf")
            text = ""
            for page in doc:
                text += page.get_text() + "\n"
            with open("prd_text.txt", "w", encoding="utf-8") as f:
                f.write(text)
            print("Success with PyMuPDF")
        except ImportError:
            print("No PDF library found")
