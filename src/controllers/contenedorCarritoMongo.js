class ContenedorCarritoMongo {
    constructor(table) {
      this._table = table;
    }
  
    // Crear Carrito
    async crearCarrito(obj) {
      try {        
        const resultnvoCarrito = await this._table.create(obj);        
        return resultnvoCarrito;
      } catch (error) {
        console.log(error.message);
      }      
    }
    
    // Listar TODOS los carritos existentes
    async listarCarritos() {
      try{
        return await this._table.find();
      } catch (error) {
        console.log(error.message);
      }        
    }

    // Listar un carrito de un ID en especifico
    async listarCarritoId(idCarrito) {
      try {
        return await this._table.findById({ _id: idCarrito });
      } catch (error) {
        return {
          status: "error",
          mensaje: "No existe el carrito con ese ID o es un formato invalido",
        };
      }
    }

    // Listar los Productos de un ID carrito en especifico
    async listarProductosDelCarrito(id) {
      try {
        const data = await this._table.findById({ _id: id });        
        const result = data.products;        
        return result;
      } catch (error) {
        return {
          status: "error",
          mensaje: "No existe el carrito con ese ID o es un formato invalido",
        };
      }
    }

    // Agregar Productos a un Carrito
    async agregarProductos(id, params) {
      try {
        let list = [];        
        const dataObj = await this.listarCarritoId(id);        
        list.push(...dataObj.productos);
        list.push(params);        
        return this._table.findByIdAndUpdate(id, { productos: list });
      } catch (error) {}
    }


    // Borra Un Producto de Un Carrito
    async deleteProducto(idCarrito, idProd) {
      try {
        let list = [];
        let newList = [];
        
        const dataObj = await this.listarCarritoId(idCarrito);        
        list.push(...dataObj.products);
                
        for (let i = 0; i <= list.length - 1; i++) {          
          if (list[i]._id.toString() !== idProd) {          
            newList.push(list[i]);
          }
        }
        
        return this._table.findByIdAndUpdate(idCarrito, { products: newList });
      } catch (error) {
        console.log(error.message);
      }
    }


    async updateById(id, params) {
      try {
        return this._table.findByIdAndUpdate(id, { params });
      } catch (error) {
        console.log(error.message);
      }
    }

    
    async borrarCarritoPorId(id) {
      try {
        return this._table.findByIdAndDelete({ _id: id });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  export default ContenedorCarritoMongo;
  