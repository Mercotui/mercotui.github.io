const imagelist = [
  {{ range $idx, $resource := .Resources }}
    {{ if $idx }}, {{ end }}{
      title: "{{ $resource.Title }}",
      url: "{{ $resource.RelPermalink }}"
    }{{ end }}
]
