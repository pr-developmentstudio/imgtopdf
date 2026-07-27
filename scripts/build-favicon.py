from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = Path(
    r"C:\Users\Sebastian\.cursor\projects\c-Users-Sebastian-Desktop-imgtopdf\assets\c__Users_Sebastian_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-e4371528-492c-4370-93d9-c5d2a5f03410.png"
)

logo = Image.open(SRC).convert("RGBA")
height = logo.height
icon = logo.crop((0, 0, height, height))

# Escalar desde el recorte pequeño para mejor nitidez en pestaña
icon_hq = icon.resize((128, 128), Image.Resampling.NEAREST)

PUBLIC.mkdir(exist_ok=True)
icon_hq.save(PUBLIC / "favicon.png", format="PNG")
icon_hq.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-32x32.png", format="PNG")
icon_hq.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", format="PNG")
icon_hq.save(
    PUBLIC / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
)

print("favicons generated")
