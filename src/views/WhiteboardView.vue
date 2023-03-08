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
    <canvas ref="canvas" class="canvas" width="1800" height="760"></canvas>

    <div class="tools">
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
       <button @click="criarLinha">Criar linha</button>
     <button @click="deleteSelected">Excluir selecionado</button>
  <button @click="undo">Desfazer</button>
      <button @click="redo">Refazer</button>
       <button @click="draw">Pintar</button>
        <button @click="startDrawing">Desenhar linha</button>
  <input type="range" min="1" max="50" v-model="lineWidth">
        <button @click="erase">Borracha</button>
    <button @click="saveCanvas">    
  </button>
    
      <button @click="compartilhar">Compartilhar <font-awesome-icon icon="fa-solid fa-user-secret" /></button>

      </div>

     
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
      pencil:'../assets/tools/pencil.svg',
           selectedColor: "#000000",
      inputText: '',
       undoStack: [],
      redoStack: [],
      lineWidth: 5,  
      brushSize: 10,
      tamanhoFonte: 10,
       selectedFont: 'Arial',
       editableText: null,
          drawing: false,
      linha: null
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

    startDrawing() {
      // Defina a variável de desenho como verdadeira
      this.drawing = true

      // Adicione um evento de clique no canvas
      this.canvas.on('mouse:down', (event) => {
        if (this.drawing) {
          // Crie uma nova linha Fabric.js
          this.linha = new fabric.Line([event.e.offsetX, event.e.offsetY, event.e.offsetX, event.e.offsetY], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: true
          })

          // Adicione a linha ao canvas
          this.canvas.add(this.linha)

          // Adicione um evento de movimento do mouse no canvas
          this.canvas.on('mouse:move', (event) => {
            // Atualize as coordenadas finais da linha para seguir o movimento do mouse
            this.linha.set({ x2: event.e.offsetX, y2: event.e.offsetY })
            this.linha.setCoords()

            // Renderize o canvas novamente
            this.canvas.renderAll()
          })

          // Adicione um evento de liberação do mouse no canvas
          this.canvas.on('mouse:up', () => {
            // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
            this.drawing = false
            this.canvas.off('mouse:move')
            this.canvas.off('mouse:up')
          })
        }
      })
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

body{
  overflow: hidden;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

canvas{

  border: 1px solid black;
}
.tools{
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  /* background: black; */
  height: 60px;
  border-radius: 10px;
}
</style>