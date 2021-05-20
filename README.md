# CloudFlare DNS: Delete Record

Removes specified DNS record using CloudFlare API.

Based on Action https://github.com/marketplace/actions/cloudflare-delete-dns-record

## Usage example

```yaml
name: Delete DNS Record

on:
  pull_request:
    type: [closed]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: Bluesboy/delete-dns-record@v2.1
        with:
          name: "review.example.com"
          token: ${{ secrets.CLOUDFLARE_TOKEN }}
          zone: ${{ secrets.CLOUDFLARE_ZONE }}
```

To create CloudFlare API Token follow instructions on https://developers.cloudflare.com/api/tokens/create

You can see Zone ID in bottom right of your zone overview page on CloudFlare

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
