# @braune-digital/filter [![npm version](https://img.shields.io/npm/v/@braune-digital/filter.svg)](https://www.npmjs.com/package/@braune-digital/filter)


## Installation
First you need to install the npm module:
```
npm install @braune-digital/filter --save
```

## Usage

1. Import `FilterModule`:
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} fro m '@angular/core';
import { AppComponent } from './app.component';
import { FilterModule } from '@braune-digital/filter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

```

## Dependencies
- https://www.npmjs.com/package/@ngx-translate/core
- https://github.com/valor-software/ngx-bootstrap
