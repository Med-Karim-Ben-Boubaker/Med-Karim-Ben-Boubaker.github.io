# Personal Blog

A Hugo-based personal blog using the PaperMod theme.

## Setup

### Install Hugo
```powershell
# Using Chocolatey
choco install hugo

# Using Scoop
scoop install hugo
```

### Install PaperMod Theme
```bash
git submodule update --init --recursive
```

## Development

### Start Development Server
```bash
hugo server
```
Access at: `http://localhost:1313`

### Build for Production
```bash
hugo --minify
```

### Create New Post
```bash
hugo new posts/post-name.md
```

## Configuration

Site configuration is managed in `hugo.yaml`. The site uses the PaperMod theme and is configured for GitHub Pages deployment.

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.
