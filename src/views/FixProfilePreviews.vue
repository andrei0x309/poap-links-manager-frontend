<template>
  <div class="dark:bg-gray-800 dark:text-white bg-white py-6 sm:py-8 lg:py-12">
    <div
      class="
        glass
        max-w-screen-lg
        px-4
        md:px-8
        mx-auto
        flex
        items-center
        flex-row
      "
      style="min-height: 60vh"
    >
    <div class="col-span-12 mx-auto">
    <div class="overflow-auto lg:overflow-visible">
                <Alert
        :hidden="alertHidden"
        :title="alertTitle"
        :message="alertMessage"
        :type="alertType"
        class="m-6"
      />
           <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
    <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Fix Profile Previews</h2>

    <form @submit.prevent="reparLast100Prev" class="max-w-lg border rounded-lg mx-auto">
      <div class="flex flex-col gap-4 p-4 md:p-8">
          <label for="eosName" class="inline-block text-gray-800 text-sm sm:text-base mb-2">EosName:</label>
          <input v-model="eosName"  name="eosName" class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
        </div>
<SimpleSpinner :show="simpleSpinnerShow" size="0.7rem" />
<div v-if="showFixLoader" class="loading-page">
  <div class="counter">
    <p>Trying to Fix Previews</p>
    <h1>{{count}}%
    </h1>
    <hr :width="`${count}%`" />
  </div>
</div>
<div class="sucmsg" v-if="endMsgShow">
    All fix request have been sent visit your profile page after some minutes.
</div>

 <button class="repBtn flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px"  class="w-5 h-5 flex-shrink-0" width="24" height="24" viewBox="0 0 512 512">
<path style="fill:#234556;" d="M512,244.02v23.964c0,12.808-10.394,23.286-23.097,23.286H444.24h-91.344l70.397,59.069  l33.791,28.354c9.731,8.165,10.958,22.873,2.726,32.685l-15.403,18.357c-8.232,9.811-22.93,11.157-32.661,2.992l-33.363-27.995  L256,302.039L133.619,404.729l-33.363,27.995c-9.731,8.165-24.429,6.82-32.661-2.992l-15.403-18.356  c-8.232-9.81-7.005-24.519,2.726-32.685l33.791-28.354l70.397-59.069H66.65H23.097C10.394,291.268,0,280.79,0,267.983V244.02  c0-12.807,10.394-23.286,23.097-23.286h44.111h91.896L89.131,162.02l-34.214-28.709c-9.731-8.165-10.958-22.873-2.726-32.685  l15.403-18.357c8.232-9.81,22.93-11.157,32.661-2.992l32.398,27.185L256,209.963l123.346-103.5l32.398-27.185  c9.731-8.165,24.429-6.82,32.661,2.992l15.403,18.357c8.232,9.811,7.006,24.519-2.726,32.685l-34.214,28.709l-69.974,58.714h93.715  h42.292C501.607,220.734,512,231.212,512,244.02z"/>
<path style="fill:#415E70;" d="M447.29,256c0,105.647-85.643,191.29-191.29,191.29S64.71,361.647,64.71,256  S150.353,64.711,256,64.711S447.29,150.354,447.29,256z"/>
<path style="fill:#234556;" d="M397.203,256c0,77.984-63.219,141.203-141.203,141.203S114.797,333.985,114.797,256  S178.016,114.798,256,114.798S397.203,178.016,397.203,256z"/>
<path style="fill:#071C23;" d="M362.004,256c0,58.545-47.46,106.004-106.004,106.004S149.996,314.544,149.996,256  S197.456,149.996,256,149.996S362.004,197.455,362.004,256z"/>
<path style="fill:#E69724;" d="M266.019,124.254v249.36c0,5.533-4.484,10.017-10.017,10.017c-5.533,0-10.017-4.484-10.017-10.017  v-249.36c0-5.533,4.484-10.017,10.017-10.017C261.534,114.237,266.019,118.721,266.019,124.254z"/>
<path style="fill:#DA6D18;" d="M322.093,26.338v65.278c0,3.566-1.897,6.864-4.979,8.657l-56.073,32.638  c-1.557,0.906-3.298,1.36-5.039,1.36c-1.741,0-3.482-0.453-5.039-1.36l-56.076-32.638c-3.082-1.794-4.979-5.091-4.979-8.657V26.338  c0-3.566,1.897-6.864,4.979-8.657l28.038-16.318c4.782-2.784,10.913-1.163,13.697,3.619c2.783,4.782,1.163,10.915-3.619,13.697  l-23.061,13.42v53.757l46.059,26.808l46.056-26.807V32.098l-23.056-13.421c-4.782-2.783-6.401-8.915-3.619-13.697  c2.783-4.782,8.915-6.402,13.697-3.619l28.035,16.318C320.196,19.474,322.093,22.772,322.093,26.338z"/>
<path style="fill:#B21100;" d="M269.672,512h-27.346c-9.825,0-17.86-8.103-17.86-18.01V348.839c0-17.483,14.19-31.789,31.536-31.789  l0,0c17.342,0,31.536,14.306,31.536,31.789V493.99C287.537,503.897,279.5,512,269.672,512L269.672,512z"/>
<path style="fill:#DC2C13;" d="M256,317.05V512h-13.676c-9.825,0-17.86-8.103-17.86-18.01V348.839  C224.464,331.356,238.655,317.05,256,317.05z"/>
<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>
          Try to Fix Last 100 Previews From feed.
        </button>
      <div class="flex justify-center items-center bg-gray-100 p-4">
        <p class="text-gray-500 text-sm text-center">Don't know to find the eosname <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">api.yup.io/accounts/[your-username]</a></p>
      </div>
    </form>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { getData, postData } from "@/util/index.js";
import Alert from "@/components/Alert";
import SimpleSpinner from "@/components/admin/SimpleSpinner";

export default defineComponent({
  name: "FixProfilePreviews",
  components: {
    Alert,
    SimpleSpinner
  },
  setup(props) {

    const YUP_API_BASE = 'https://api.yup.io'
    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");
    const showFixLoader = ref(false);
    const endMsgShow = ref(false);
    const count = ref(0);
    const simpleSpinnerShow = ref(false);

    const eosName = ref("");

    const dbPastEvents = ref([]);

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    const checkEosNameValid = () => {
      if (eosName.value.length !== 12) return false;
      if (!eosName.value.match(/^[a-z1-5.]+$/)) return false;
      return true;
    };

    const checkYUPUser = async () => {
         const reqUser = await getData(`${YUP_API_BASE}/accounts/${eosName.value}`)
         if(!reqUser.ok){
           return false
         }
        return true
    }

    const reparLast100Prev = async () =>{
        alertHidden.value = true;
        if(!eosName.value) {
            showAlertError("Error", "EOS Name is required");
            return;
        }
        if( !(checkEosNameValid())) {
            showAlertError("Error", "Please enter a valid EOS Name");
            return;
        }
        if(!(await checkYUPUser())) {
            showAlertError("Error", "EOS Name does not belong to a YUP user");
            return;
        }
        if(localStorage.getItem("endMsgShow") === "true"){
            showAlertError("Error", "You have already have done this action recently");
            return;
        }
        simpleSpinnerShow.value = true;
        const reqVotes = await getData(`${YUP_API_BASE}/votes/voter/${eosName.value}?limit=100`)
        if(!reqVotes.ok){
            showAlertError("Error", "Error getting votes from YUP API");
            return;
        }
        simpleSpinnerShow.value = false;
        showFixLoader.value = true;
        const votes = await reqVotes.json();
        console.log(votes)
        for(const vote of votes){
            const postid = vote.postid
            await postData(`${YUP_API_BASE}/posts/re-fetch/preview`, {
                postid
                })
                count.value = count.value + 1
                console.log(count.value)
                await new Promise(resolve => setTimeout(resolve, 50));
        }
        showFixLoader.value = false;
        localStorage.setItem("endMsgShow", true)
        endMsgShow.value = true;
    }

    onMounted(async () => {
    });

    return {
      dbPastEvents,
      props,
      reparLast100Prev,
    alertHidden,
      alertTitle,
     alertMessage,
     alertType,
     eosName,
     showFixLoader,
     count,
     endMsgShow,
     simpleSpinnerShow

    };
  },
});
</script>

<style lang="scss">
button.repBtn {
    background-color: steelblue;
    padding: 1.2rem;
    margin: auto;
}


.loading-page {
    background: #404040;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    padding: 2rem;
}
.loading-page .counter {
  text-align: center;
}
.loading-page .counter p {
  font-size: 40px;
  font-weight: 100;
  color: #f60d54;
}
.loading-page .counter h1 {
  color: white;
  font-size: 60px;
  margin-top: -10px;
}
.loading-page .counter hr {
  background: #f60d54;
  border: none;
  height: 1px;
}
.loading-page .counter {
  position: relative;
  width: 200px;
}
.loading-page .counter h1.abs {
  position: absolute;
  top: 0;
  width: 100%;
}
.loading-page .counter .color {
  width: 0px;
  overflow: hidden;
  color: #f60d54;
}

.sucmsg {
    color: green;
    background: #4a4a4a29;
    padding: 0.5rem;
    margin: -1rem 1rem 1rem 1rem;
}

</style>
