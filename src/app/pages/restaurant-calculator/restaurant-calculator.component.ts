import { Component } from '@angular/core';
import Decimal from 'decimal.js';



@Component({
  selector: 'app-restaurant-calculator',
  templateUrl: './restaurant-calculator.component.html',
  styleUrls: ['./restaurant-calculator.component.css']
})
export class RestaurantCalculatorComponent {
  visibleproduct:boolean = false
  visibleclient:boolean = false
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


  openPopup(tipo:string){
    if (tipo == "product"){
      this.visibleproduct = !this.visibleproduct
    } else {
      this.visibleclient = !this.visibleclient
    }
  }

  buildFram(){
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

  addMesa(produto:any){
    const totalItens = this.produtomesas.length;
    const novoProdutoMesa = {id:totalItens +1, name: produto.name, price: produto.price };
    console.log(novoProdutoMesa);
    this.produtomesas.push(novoProdutoMesa);
  }

  addCliente(){
    this.clientes.push({name: this.nomecliente, consumerProduct:[]});
    this.visibleclient = false;
  }

  adicionaProduto():void {
    const novoProduto = {id:this.nextProductId, name: this.nomeproduto, price: this.precoproduto };
    console.log(novoProduto);
    this.produtos.push(novoProduto);
    this.nextProductId++;
    this.visibleproduct = false;
  }


  calcularValorPagoPorCliente() {
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

  openModal(selecttype:string ,edit = false, index = 0) {
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
