# SidePro Quick-Start: Node.js + MySQL

This is a *very* small sample application that demonstrates how to deploy a Node.js API that talks to a MySQL database on the SidePro cloud-hosting platform.

---

## 1. What the app does

* Starts a tiny Express server (≈10 lines of code)
* Connects to a MySQL database using environment variables that SidePro provides
* Exposes two HTTP endpoints:
  * `GET /health`   → returns `{ status: "ok" }` so you know the app is running
  * `GET /products` → returns the contents of a sample `products` table (2 rows by default)

---

## 2. Files in this project

| File | Purpose |
|------|---------|
| `index.js` | Small Express + MySQL2 server (≃40 LOC) |
| `package.json` | Declares the two dependencies (`express`, `mysql2`) |
| `init.sql` | Optional SQL you can paste into SidePro to pre-create a `products` table & 2 rows |
| `env.example` | A *template* for the five environment variables the code expects |

You don't have to change any code to get this running.

---

## 3. Step-by-step deployment on SidePro

> These steps match the screenshots you attached. If something looks different in the UI, SidePro may have tweaked wording but the flow is the same.

### Step A – Upload the source code

1. From your **Dashboard ➜ Deploy Application**, stay on the first tab **Source Code**.
2. Click **Upload Folder / Zip** (or **Connect Git** if you prefer). 
   • If uploading: create a `.zip` of this project folder and select it.
3. Wait until SidePro shows that the source has been uploaded.

### Step B – Add a MySQL database

1. Go to the **Database / Cache / Queue** tab.
2. Click **Add Database**.
3. Fill in the dialog:
   * **Name** → any name you like, e.g. `instock` or `mydb`.
   * **Catalog Service** → choose **mysql**.
4. (Optional but recommended) Click inside **Database Initialization Script**, paste the entire contents of `init.sql`, then click **Create Database**. This will create the `products` table + two demo rows for you.
5. After creation, SidePro will show **Connection Details** — host, port, db name, user, password. **Copy them; you will need them in the next step**.

### Step C – Provide environment variables

1. Move to the **Environment Variables** tab.
2. Either:
   • Click **Read from .env file** and upload a text file that contains
     ```
     DB_HOST=<value-from-SidePro>
     DB_PORT=<3306 or the port SidePro shows>
     DB_NAME=<value-from-SidePro>
     DB_USER=<value-from-SidePro>
     DB_PASSWORD=<value-from-SidePro>
     PORT=8080
     ```
   • – or –
   • Manually add six rows using the **Variable name / Value** boxes (you already did this in the screenshot).
3. Confirm that each variable name **matches exactly** what you see above — capital letters, underscores, no extra spaces.

### Step D – Deploy 🚀

1. Click **Next / Deploy**.
2. SidePro will build the Docker image for you. (Nothing to configure; Node.js projects are detected automatically.)
3. When finished, you'll see a **Generated URL** like `https://<your-app>.sidepro.app`.
4. Visit `https://<your-app>.sidepro.app/health` — you should see `{ "status": "ok" }`.
5. Visit `https://<your-app>.sidepro.app/products` — you should see the two sample rows.

That's it! 🎉

---

## 4. Troubleshooting

• *Environment variables typo* → the app logs will show "Missing one or more required database environment variables."
• *Database not initialised* → `/products` returns `Error: Table 'products' doesn't exist`. Paste/run the `init.sql` in the DB console or recreate the DB with the script.

If you get stuck, send the logs to your tech team or post in SidePro support — the entire project is fewer than 100 lines, so issues are usually small typos. 😊 