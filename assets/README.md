# Portfolio Media Assets

Drop your real media files here to replace the placeholders.

## 📁 Folder Structure

```
assets/
  images/
    hero.jpg        ← Hero background image (1920×1080 or larger recommended)
    about.jpg       ← About section portrait (vertical 3:4 crop recommended)
  videos/
    hero.mp4        ← Optional hero background video (720p/1080p, muted loop)
```

## 🎬 Enabling Hero Video

In `index.html`, inside the `#hero` section:

1. **Remove** the `<img>` tag
2. **Uncomment** the `<video>` block:

```html
<video class="hero-video hero-img" autoplay muted loop playsinline>
  <source src="assets/videos/hero.mp4" type="video/mp4" />
</video>
```

## 📸 Adding Showcase Images

For each carousel card, add an `<img>` inside `.card-media`:

```html
<div class="card-media fitness-thumb">
  <img src="assets/images/content-1.jpg" alt="Morning Strength Circuit" loading="lazy" />
  <div class="play-icon">...</div>
  <div class="card-category">FITNESS</div>
</div>
```

## 🎥 Adding Showcase Videos (click-to-play)

Replace the `<img>` with a `<video>` (no autoplay — JS handles play-on-click):

```html
<div class="card-media fitness-thumb">
  <video poster="assets/images/content-1-thumb.jpg">
    <source src="assets/videos/content-1.mp4" type="video/mp4" />
  </video>
  <div class="play-icon">...</div>
  <div class="card-category">FITNESS</div>
</div>
```

## 💡 Tips

- Use **WebP** for images when possible (smaller, faster)
- Keep video files under **10MB** for web performance
- Images will gracefully fall back to `hero_bg.png` / `about_portrait.png` if the assets folder files aren't present
