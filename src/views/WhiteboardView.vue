<template>
  <nav>
    <div class="menu">
      <a href="#">Logo</a>
      <ul>
        <li>
          <a href="#">User name</a>
        </li>

        <li>
          <a href="#">Log out</a>
        </li>
      </ul>
    </div>
  </nav>
  
  <div class="fabric">
    <canvas ref="canvas" width="500" height="500"></canvas>
      <button class="piscar" @click="addEditableText">T</button>
          <label for="font-select">Selecione a fonte:</label>
        <select id="font-select" v-model="selectedFont">
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
        <input type="range" min="10" max="128" v-model="tamanhoFonte">
  <input type="color" v-model="selectedColor">
    <button @click="addSquare">Add quadro</button>
    <button @click="addcirculo">Add quadro</button>
     <button @click="deleteSelected">Excluir selecionado</button>
  <button @click="undo">Desfazer</button>
      <button @click="redo">Refazer</button>
       <button @click="draw">Pintar</button>
  <input type="range" min="1" max="50" v-model="lineWidth">
        <button @click="erase">Borracha</button>
    <button @click="saveCanvas">Salvar</button>
      <button @click="compartilhar">Compartilhar</button>
  </div>
</template>

<script>
import {fabric} from "fabric"
import { saveAs } from 'file-saver';
  export default {
      mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    this.canvas.on('text:editing:entered', (options) => {
      this.editableText = options.target;
    });


      },

       data() {
    return {
           selectedColor: "#000000",
      inputText: '',
       undoStack: [],
      redoStack: [],
      lineWidth: 5,  
      brushSize: 10,
      tamanhoFonte: 10,
       selectedFont: 'Arial',
       editableText: null,
    };
  },

      methods:{
           addSquare(event) {
      const rect = new fabric.Rect({
        left: event.offsetX,
        top: event.offsetY,
       fill: this.selectedColor,
        width: 50,
        height: 50,
        
      });

      this.canvas.add(rect);
        this.saveState(); 
      this.canvas.isDrawingMode = false;
      },
    erase() {
      this.canvas.isDrawingMode = true;
      this.canvas.freeDrawingBrush.color = "#ffffff";
      this.canvas.freeDrawingBrush.width = this.lineWidth;
    },

      draw() {
      if (this.canvas.isDrawingMode) {
        this.canvas.isDrawingMode = false;
      } else {
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.canvas.freeDrawingBrush.width = this.lineWidth;
      }
    },

    addcirculo(event) {
      
        const circle = new fabric.Circle({
          left: event.offsetX,
          top: event.offsetY,
          fill: this.selectedColor,
          radius: 25,
          
      });

      this.canvas.add(circle);
        this.saveState();
         this.canvas.isDrawingMode = false;
    },
 addEditableText() {
      const editableText = new fabric.IText('Digite aqui...', {
        left: 50,
        top: 50,
        fill: 'black',
        fontSize: 20,
        font : this.tamanhoFonte,
        fontFamily: this.selectedFont,
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.canvas.discardActiveObject();
          this.editableText = null;
        }
      });
      this.canvas.add(editableText);
      
      this.editableText = editableText;
    },

     
  deleteSelected() {
    const selectedObjects = this.canvas.getActiveObjects();
    this.canvas.discardActiveObject();

    if (selectedObjects.length > 0) {
      this.canvas.remove(...selectedObjects);
              this.saveState();

    }
  },
   
  undo() {
      if (this.undoStack.length > 0) {
        const lastState = this.undoStack.pop();
        this.redoStack.push(this.canvas.toJSON());
        this.canvas.loadFromJSON(lastState);
      }
    },
    redo() {
      if (this.redoStack.length > 0) {
        const lastState = this.redoStack.pop();
        this.undoStack.push(this.canvas.toJSON());
        this.canvas.loadFromJSON(lastState);
      }
    },
    saveState() {
      this.undoStack.push(this.canvas.toJSON());
      this.redoStack = [];
    },
    saveCanvas() {
      const dataUrl = this.canvas.toDataURL('image/png');
      const blob = this.dataURItoBlob(dataUrl);
      saveAs(blob, 'canvas.png');
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
  },
    compartilhar() {
    const canvas = this.$refs.canvas;

    // converte o conteúdo do canvas em uma imagem
    const imagem = canvas.toDataURL("image/png");

    // usa a API Web Share para compartilhar a imagem
    navigator.share({
      title: "Compartilhar Canvas",
      text: "Olha só o que eu desenhei!",
      url: imagem
    }).then(() => {
      console.log("Conteúdo compartilhado com sucesso!");
    }).catch((error) => {
      console.log("Erro ao compartilhar conteúdo:", error);
    });
  }

    }


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  background: rgb(39, 0, 164);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

}

nav a {
  color: #fff;
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 3rem;
}

.menu {
  display: flex;
  justify-content: space-between;
  width: 1600px;
  margin: 0 auto;
}

.fabric{
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas{
  border: 1px solid black;
}
</style>