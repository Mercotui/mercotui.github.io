# mercotui.github.io
My personal website, currently just a landing page.

If you notice something is broken, or missing, or just in general wrong:
first off all, sorry for that. Second, you can create an issue and I'll take a look at it.

## Installing Locally

To develop and test locally.

First of, install `ruby`, `ruby-devel`, `redhat-rpm-config`, `jekyll` packages.
Then install ruby bundler:

```
gem install bundler
```

And finaly, use bundler to install the Jekyll Github extension:

```
bundle install
```

## Testing

To deploy and test locally.

```
bundle exec jekyll serve
```
