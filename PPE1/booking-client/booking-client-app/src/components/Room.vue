<template>
    <div class="room">
      <M2LTitle>Liste des salles</M2LTitle>

      <RoomPicker v-bind:onSelectedRoomChange="changeSelectedRoom" v-bind:rooms="rooms" />

      <Error>
        {{ error | error }}
      </Error>

      <img v-bind:src="imgSrc" />
      
      <div class="room-description">
        {{ selectedRoom.description }}
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import config from '@/config';
  import bookingClientLib from '@/lib-adapter';
  import RoomPicker from '@/components/RoomPicker';
  import M2LTitle from '@/components/M2LTitle';
  import { errorFilter } from '@/common';
  import Error from '@/components/Error'

  Vue.filter('error', errorFilter);

  const roomService = bookingClientLib.roomService;

  export default {
    name: 'room',
    created: function (){
      const displayRoomListError = this.displayRoomListError;
      const setRoomList = this.setRoomList;
      const displayRoomDescription = this.displayRoomDescription;

      const controller = {
        displayRoomListError,
        setRoomList,
        displayRoomDescription
      };

      roomService.controller = controller;
      roomService.onPageLoad();
    },
    methods: {
      changeSelectedRoom: function(newRoom) {
        roomService.changeRoomSelection(newRoom);
      },
      displayRoomDescription: function (room) {
        this.imgSrc = room.image ?`${config.apiBaseUrl}/room/${room.id}/image` : '';
        room.description = room.description || '';
        this.selectedRoom = room;
      },
      displayRoomListError: function (err) {
        this.error = err;
      },
      setRoomList: function (list) {
        this.rooms = list;
      }
    },
    data () {
      return { 
        selectedRoom: {},
        rooms: [],
        error: '',
        imgSrc: '',
      }
    },
    components: {
      RoomPicker,
      M2LTitle,
      Error,
    }
  }
</script>

<style scoped>
  .room-description {
    text-align: justify;
    margin-top: 20px;
  }

  img {
    margin-top: 10px;
    max-width: 250px;
  }
</style>
