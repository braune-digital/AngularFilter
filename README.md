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
    AppComponent,
    FilterModule
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

```