# hb-challenge

> hepsiburada.com challenge

Demo: https://hb-challenge.herokuapp.com

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Uygulama'nin bagimliliklari

- **vue** angular gibi bir js framework'udur. bu uygulama vuejs ile yapilmistir.
- **vuex** vue framework'u icin bir state manager'idir. state'leri yonetmek icin kullanilmistir.
- **vue-router** vue framework'u icin bir router'dir. routing islemleri icin kullanilmistir.
- **uuid4** bir uuid olusturucudur, localstorage'a eklenen kayitlar icin uniq bir ID olusturmak icin kullanilmistir.

Production ortaminda, projenin yukarida belirtilen bagimliliklari disinda bir bagimliligi yoktur.

## Teknik aciklamalar

Uygulama yazilirken mumkun oldugunca **SOLID** prensipleri uygulanmaya calisilmistir.

Uygulama yazilirken "webpack+babel" yardimi ile ES6 sozdizimi kullanilmistir.

uygulama icerisinde asagidaki dosyalari goreceksiniz

- **models.js** uygulama'da kullanilan Entity'ler bu dosya icerisinde tutulur. Model db'ye yazilmadan once "serialize" edilir, db'den cekilirken de unserialize edilir.
- **repos.js** db islemleri icin "repository pattern" kullanilmistir, bu katman servis katmani ile storage katmani arasindadir. Boylelikle servis katmani storage'dan soyutlanmis olur. Yani birgun "local storage" yerine, kayitlari farkli bir yerden almak istersek, yeni bir repository olusturup bunu servis'e inject etmek yeterli olacaktir.
- **services.js** uygulama icerisindeki CRUD operasyonlari yoneten katmandir. 
- **vuex/store.js** uygulama icerisindeki state'ler burada yonetilir.

NOT: models, repos, ve services katmanlari tamamen framework'den bagimsizdir. yani buraki kodlari istedigimiz ortamlarda kullanabilir. Boylelikle "business logic" icinde bulundugu ortamdan soyutlanmis olur.