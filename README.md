# personal-website

My personal website, hosted at [https://mercotui.com](https://mercotui.com) on github.io.

## Local deployment

To test the website locally, the following command can be used:

```bash
hugo server --bind=0.0.0.0 --baseURL=<ip_adress> --cleanDestinationDir
```

## Processing images

After adding JPEGs, their metadata can be scrubbed by running:

```bash
jhead -purejpg -dt -autorot **/*.jpg
```
