<template>
  <div>
    <div class="container">
    <h1>Welcome</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input  type="email" id="email" v-model="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <div class="rember">
        <div class="check">
    <input type="checkbox" name="" id="">Remember me
        </div>
      
        <div class="fogt_pass">
          <a href="#">Forgot password?</a>
        </div>
      </div>
      <button class="login" type="submit">Login</button>
    </form>
    </div>
    
  </div>
</template>

<script>
// import { useRouter } from 'vue-router';

// const router = useRouter();
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.email === 'admin@gmail.com' && this.password === 'admin') {
        // Login successful
        this.$router.replace("/quadro");
        this.$alert("Hello Vue Simple Alert.");
   
      } else {
        // Login failed
        alert('Invalid email or password')
      }
    }
  }
}
</script>

<style >
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  

}

a{
  text-decoration: none;
}

.check{
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.check input{
  width: 18px;
  height: 18px;
}


.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form{
  margin-top: 122px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1rem;
}

h1{
  font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 44px;
line-height: 50px;
/* identical to box height, or 114% */


/* Neutral Colors/Headings Black */

color: #5D5A88;

}
label{
  font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
/* identical to box height, or 100% */


/* Neutral Colors/Headings Black */

color: #5D5A88;
}

.rember{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
#email, #password{
width: 503px;
  height: 60px;
  border:none;
  background: #eaeaff;
  font-size: 18px;
  color: #8D8BA7;
border-radius: 10px;
}
#email{
  position: relative;
  padding-left: 40px; /* Adicione um preenchimento à esquerda para o ícone */
  background-image: url("../assets/email.svg");
  background-repeat: no-repeat;
  background-position: left center; 
  background-size:40px 30px;
}

#email:focus{
  outline: none;
  border: 1px solid #403b7f
}

#password:focus{
  outline: none;
  border: 1px solid #403b7f
}

#password{
  position: relative;
  padding-left: 40px; 
  background-image: url("../assets/lock.svg");
  background-repeat: no-repeat;
  background-position: left center; 
 background-size: 40px 30px 
 
}


.login{
  margin-top: 2rem;
height: 54px;
border: none;
color: #fff;
background: #5D5A88;
border-radius: 20px;

}

/* Responsive */

@media (max-width: 768px) {
   
  /* estilos para telas menores que 768 pixels */


.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form{
  margin-top: 122px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1rem;
}

h1{
  font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 44px;
line-height: 50px;
/* identical to box height, or 114% */


/* Neutral Colors/Headings Black */

color: #5D5A88;

}
label{
  font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 18px;
/* identical to box height, or 100% */


/* Neutral Colors/Headings Black */

color: #5D5A88;
}

.rember{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
#email, #password{
width: 403px;
  height: 60px;
  border:none;
  background: #eaeaff;
  font-size: 18px;
  color: #8D8BA7;
border-radius: 10px;
}
#email{
  position: relative;
  padding-left: 40px; /* Adicione um preenchimento à esquerda para o ícone */
  background-image: url("../assets/email.svg");
  background-repeat: no-repeat;
  background-position: left center; 
  background-size:40px 30px;
}

#email:focus{
  outline: none;
  border: 1px solid #403b7f
}

#password:focus{
  outline: none;
  border: 1px solid #403b7f
}

#password{
  position: relative;
  padding-left: 40px; 
  background-image: url("../assets/lock.svg");
  background-repeat: no-repeat;
  background-position: left center; 
 background-size: 40px 30px 
 
}


button{
  margin-top: 2rem;
height: 54px;
border: none;
color: #fff;
background: #5D5A88;
border-radius: 20px;

}
}


</style>
