import Vue from 'vue'
import Router from 'vue-router'
import Acceuil from '@/components/Acceuil'
import Inscription from '@/components/Inscription'
import Profile from '@/components/Profile'
import Reservation from '@/components/Reservation'
import Salle from '@/components/Salle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/', 
      name : 'Acceuil', 
      component : Acceuil
    },
    {
      path : '/inscription', 
      name : 'Inscription' , 
      component : Inscription  
    },
    {
      path : '/profile', 
      name : 'Profile', 
      component : Profile
    },
    {
      path : '/reservation',
      name : 'reservation', 
      component : Reservation
    },
    {
      path : '/salle' , 
      name : 'salle', 
      component : Salle 
    }

  ]
})
