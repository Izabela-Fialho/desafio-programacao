import { Component } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {

  // números romanos para arábicos

  inputValue: string = '';

  keyClicked(value: string) {
    if (value === '=') {
      if (this.validarNumeroRomano(this.inputValue)) {
        const arabicNumber = this.convertToArabic(this.inputValue);
        this.inputValue = arabicNumber.toString();
      } else {
        this.inputValue ="Não é número romano!";
      }
    } else if (value === '<') {
      this.inputValue = this.inputValue.slice(0, -1);
    } else if(value == 'c'){
      this.inputValue ="";
    }else {
      this.inputValue += value;
    }
  }

  validarNumeroRomano(romanNumber: string): boolean {
    const romanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romanRegex.test(romanNumber);
  }

  convertToArabic(romanNumber: string): number {
    const romanToArabicMap: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };

    let arabicNumber = 0;
    let prevDigit = 0;

    for (let i = romanNumber.length - 1; i >= 0; i--) {
      const currentDigit = romanToArabicMap[romanNumber[i]];

      if (currentDigit >= prevDigit) {
        arabicNumber += currentDigit;
      } else {
        arabicNumber -= currentDigit;
      }

      prevDigit = currentDigit;
    }
    return arabicNumber;
  }

  // números arábicos para romanos

  inputValueNumber: string = '';


  keyClickedNumber(value: string) {
    if (value === '=') {
      const number = +this.inputValueNumber;
      if (number >= 1 && number <= 3999) {
          this.convertToRoman();
      } else {
        this.inputValueNumber = 'Número invalido!';
      }
    } else if (value === 'c') {
      this.inputValueNumber = '';
    } else if (value === '<') {
      this.inputValueNumber = this.inputValueNumber.slice(0, -1);
    } else {
      this.inputValueNumber += value;
    }
  }

  convertToRoman() {
    const arabicNumber = parseInt(this.inputValueNumber);
    const romanNumber = this.convertArabicToRoman(arabicNumber);
    this.inputValueNumber = romanNumber;
  }

  convertArabicToRoman(arabicNumber: number): string {
    const romanNumeralsMap: { [key: number]: string } = {
      1000: 'M',
      900: 'CM',
      500: 'D',
      400: 'CD',
      100: 'C',
      90: 'XC',
      50: 'L',
      40: 'XL',
      10: 'X',
      9: 'IX',
      5: 'V',
      4: 'IV',
      1: 'I',
    };

    let romanNumber = '';

    for (let num = arabicNumber; num >=0; num--) {
      let value = num;
      if(arabicNumber >= value){
        if (romanNumeralsMap[value]==undefined){
        }else {
        romanNumber += romanNumeralsMap[value];
        arabicNumber -= value;
        num++;
        }
      }
    }

    return romanNumber;
  }

}








