# hono_preact3

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2023/10/16

 update  : 2023/10/28

***
### Summary

preact.js + hono + workers,  sample

***
### wrangler.toml

* db setting, sample
```
name = "hono_preact3"
main = "src/index.ts"
compatibility_date = "2023-09-01"
node_compat = true

[site]
bucket = "./public"

[vars]
#API_KEY = "123"
#BASIC_USER_NAME = "test"
#BASIC_USER_PASSWORD = "1111"

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "db123"
database_id = ""


```
***
### blog 

https://zenn.dev/knaka0209/scraps/ca2bcd43be460b

***

