import { Component } from '@angular/core';
import Decimal from 'decimal.js';



@Component({
  selector: 'app-restaurant-calculator',
  templateUrl: './restaurant-calculator.component.html',
  styleUrls: ['./restaurant-calculator.component.css']
})
export class RestaurantCalculatorComponent {
  nextProductId = 1;
  nextProductMesaId= 1;

  public nomeproduto = "";
  public precoproduto:number = 0;
  public nomecliente = "";
  public novoconsumido ="";
  public produtos: { id: number, name: string, price: number }[] = [];
  public produtomesas: { id: number, name: string, price: number }[] =[];
  public listaTotal: { nome: string, subtotal: number, total: number }[] = [];
  public clientes: { name: string, consumerProduct: number[] }[] =[]

  adicionaProduto():void {
    const novoProduto = {id:this.nextProductId, name: this.nomeproduto, price: this.precoproduto };
    const modal: HTMLElement | null = document.querySelector('.modal-box')
    console.log(novoProduto);
    this.produtos.push(novoProduto);
    this.nextProductId++;
    if (modal == null){
      //pass
    }else {
      modal.classList.remove('active');
    }
  }

  addCliente():void{
    const modal: HTMLElement | null = document.querySelector('.modal-box-client')
    this.clientes.push({name: this.nomecliente, consumerProduct:[]});
    if (modal == null){
      //pass
    }else {
      modal.classList.remove('active');
    }
  }

  addMesa(produto:any):void{
    const totalItens = this.produtomesas.length;
    const novoProdutoMesa = {id:totalItens +1, name: produto.name, price: produto.price };
    console.log(novoProdutoMesa);
    this.produtomesas.push(novoProdutoMesa);
  }

  deleteProduto(item:any):void {
    this.produtos.splice(this.produtos.indexOf(item,1))
  }

  deleteProdutoMesa(item:any):void {
    this.produtomesas.splice(this.produtomesas.indexOf(item,1))
  }

  buildFram():void{
    for (const cliente of this.clientes) {
      cliente.consumerProduct = [];
      console.log(cliente.consumerProduct)
      for (const produtomesa of this.produtomesas) {
        const checkboxId = `checkbox-${cliente.name}-${produtomesa.id}`;
        const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
        console.log(checkboxId)
        console.log(checkbox.checked)
        if (checkbox && checkbox.checked) {
          cliente.consumerProduct.push(produtomesa.id);
        }
      }
    }
  }

  calcularValorPagoPorCliente():void {
    this.listaTotal = [];

    for (const cliente of this.clientes) {
      let subtotal = 0;
      let total = 0;
      let produtosConsumidos = [];


      for (const produtomesa of this.produtomesas) {
        const checkboxId = `checkbox-${cliente.name}-${produtomesa.id}`;
        const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

        if (checkbox && checkbox.checked) {
          produtosConsumidos.push(produtomesa);
          console.log("produtosConsumidos",produtosConsumidos)
        }
      }

      for (const produto of produtosConsumidos) {
        const clientesQueConsumiram = this.clientes.filter(c => c.consumerProduct.includes(produto.id));
        const quantidadeClientes = clientesQueConsumiram.length;

        if (quantidadeClientes === 1) {
          subtotal += produto.price;
        } else {
          const valorProporcional = produto.price / quantidadeClientes;
          subtotal += valorProporcional;
        }
      }

      const checkboxTaxaId = `checkbox-taxa-${cliente.name}`;
      const checkboxTaxa = document.getElementById(checkboxTaxaId) as HTMLInputElement;
      if (checkboxTaxa && checkboxTaxa.checked) {
        const taxa = 0.1;
        total = subtotal + (subtotal * taxa);
      } else {
        total = subtotal;
      }
      this.listaTotal.push({ nome: cliente.name, subtotal, total });

    }
    console.log(this.listaTotal);
  }

  openModal(selecttype:string ):void {
    if (selecttype == "product"){
      const modal: HTMLElement | null = document.querySelector('.modal-box');
      if (modal) {
        modal.classList.add('active');

        modal.onclick = (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.className.indexOf('modal-box') !== -1) {
            modal.classList.remove('active');
          }
        };
    }
    }else{
    const modal: HTMLElement | null = document.querySelector('.modal-box-client');
    if (modal) {
      modal.classList.add('active');

      modal.onclick = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.className.indexOf('modal-box-client') !== -1) {
          modal.classList.remove('active');
        }
        };
      }
    }
  }
}
