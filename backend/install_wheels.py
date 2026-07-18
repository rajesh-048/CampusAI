import os
import glob
import zipfile

site_pkgs = os.path.abspath(os.path.join(os.path.dirname(__file__), "site-packages"))
whls_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "whls"))

os.makedirs(site_pkgs, exist_ok=True)

wheels = glob.glob(os.path.join(whls_dir, "*.whl"))
print(f"Unpacking {len(wheels)} wheel files from {whls_dir}...")

for whl in wheels:
    print(f"Unpacking {os.path.basename(whl)}...")
    with zipfile.ZipFile(whl, 'r') as z:
        z.extractall(site_pkgs)

print("Successfully unpacked all wheels into backend/site-packages!")
