import subprocess

scripts = [
    ". ./venv/bin/activate; cd backend/; python3 manage.py runserver; exec bash",
    "cd frontend; npm run dev; exec bash",
    "kitty --session /home/daniel/Desktop/proyects/tfg/session.kitty-session; exec bash",
    "cd docker/; sudo docker compose up; exec bash",
]

for script in scripts:
    full_script = ["gnome-terminal", "--", "bash", "-c", script]
    subprocess.Popen(full_script)
