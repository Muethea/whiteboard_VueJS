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
  <div class="content">
    <div class="filter">
  <label for="my-dropdown">Filter:</label>
  <select id="my-dropdown" name="my-dropdown">
    <option value="" selected disabled hidden> all files</option>
    <option value="opcao1">all files</option>
    <option value="opcao2">Design Files</option>
  </select>
  </div>
   <div class="filter2">
    <label for="my-dropdown">Sort:</label>
    <select id="my-dropdown" name="my-dropdown">
      <option value="" selected disabled hidden> Last modified</option>
      <option value="opcao1">Last modified</option>
      <option value="opcao2">Alphabetoical</option>
           <option value="opcao2">Date created</option>
          
    </select>
    </div>
  </div>

  <div class="new">
    <div class="card">
      <button @click="criar">+</button>
      <p>Create Whiteboard</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    criar() {
           this.$router.replace("/whiteboardView");
      
    }
  }
}



</script>

<style>
*{
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
nav a{
   color: #fff;
   text-decoration: none;
}

ul{
  list-style: none;
  padding: 0;
  display: flex;
  gap: 3rem;
}

.menu{
  display: flex;
  justify-content: space-between;
  width: 1600px;
  margin: 0 auto;
}

.content{
  display: flex;
  justify-content: space-between;
  width: 1600px;
  margin: 0 auto;
  padding-top: 5rem;
}

.filter, .filter2{
  display: flex;
  align-items: center;
  gap: 1rem;
}
#my-dropdown{
  width: 146px;
  height: 40px;
  background: none;

  border-radius: 6px;
    border: .2px solid rgba(0, 0, 0, 0.224);

}

#my-dropdown:focus{
  outline: none;

}

label{
  font-size: 18px;
  font-weight: normal;
}

.new{
  display: flex;
  text-align: center;
  width: 1600px;
  margin: 0 150px;
  padding-top: 5rem;
 

}

.card{
  display: flex;
  align-items: center;
  justify-content: center;
width: 335px;
height: 237px;
background: #FFFFFF;
border: 1px solid #D4D2E3;
border-radius: 24px;
}

.card button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
height: 62px;
background: none;
border: 5px solid #D4D2E3;
border-radius: 50%;
  margin-top: 4rem;
  font-size: 4rem;
  color: #8D8BA7;
}
.card p{
  margin-top: 35px;
}
</style>