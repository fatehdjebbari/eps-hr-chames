---
description: How to push the EPS HR Assist project to GitHub
---

# Push to GitHub

Since I cannot access your GitHub account directly to create repositories, you'll need to create one and then push the code.

## Steps

1.  **Create a Repository on GitHub**:
    -   Go to [github.com/new](https://github.com/new).
    -   Enter a **Repository name** (e.g., `eps-hr-assist`).
    -   Choose **Public** or **Private**.
    -   **Do not** initialize with README, .gitignore, or License (we already have the code).
    -   Click **Create repository**.

2.  **Push the Code**:
    -   Copy the commands under "…or push an existing repository from the command line".
    -   They will look like this (replace `YOUR_USERNAME` with your actual username):

    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/eps-hr-assist.git
    git branch -M main
    git push -u origin main
    ```

3.  **Run the commands**:
    -   Paste and run these commands in your terminal.

## Verification

-   Refresh your GitHub repository page to see your code.
