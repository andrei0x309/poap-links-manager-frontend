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
      <Loading :show="loadingShow" :msg="loadingMsg" />

      <div v-if="!loadingShow" class="mx-auto" style="margin-top: -4rem">
        <div
          class="dark:bg-transparent bg-white py-4 sm:py-6 lg:py-8 px-8 mt-4"
        >
          <div v-if="showClaimBlock" class="flex flex-col gap-4 p-4 md:p-8">
            <img
              class="w-14 mx-auto"
              v-if="poapImageUrl"
              :src="poapImageUrl"
              alt="POAP"
            />
            <p class="p-4 mb-4 text-xl">{{ claimMsg }}</p>
            <p v-if="claimETH" class="p-4 mb-4">
              ETH: <b>{{ claimETH }}</b>
            </p>
            <p v-if="claimENS" class="p-4 mb-4">
              ENS: <b>{{ claimENS }}</b>
            </p>
            <p class="text-lg blinkTxt" v-if="showSimpleSpinner">
              [ Getting TX ]
            </p>
            <SimpleSpinner :show="showSimpleSpinner" size="medium" />

            <div class="text-lg" v-if="!(showSimpleSpinner || claimError)">
              <p>
                <a
                  :href="`https://blockscout.com/xdai/mainnet/tx/${claimPOAPtx}`"
                  target="_blank"
                  >TX: <b>{{ claimPOAPtx }}</b></a
                >
              </p>
            </div>

            <!-- <button
              @click.prevent="openInNewTab(claimLink)"
              class="
                block
                bg-gray-800
                hover:bg-gray-700
                active:bg-gray-600
                focus-visible:ring
                ring-gray-300
                text-white text-sm
                md:text-base
                font-semibold
                text-center
                rounded-lg
                outline-none
                transition
                duration-100
                px-8
                py-3
                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
              "
            >
              Navigate
            </button> -->
          </div>
          <div
            v-else-if="isClaimOpen && !loadingShow"
            class="max-w-screen-2xl px-4 md:px-8 mx-auto"
          >
            <h2
              class="
                text-gray-800 text-2xl
                dark:text-white
                lg:text-3xl
                font-bold
                text-center
                mb-4
                md:mb-8
              "
            >
              Get YUP POAP Claim Link
            </h2>

            <Alert
              :hidden="alertHidden"
              :title="alertTitle"
              :message="alertMessage"
              :type="alertType"
              class="mb-6"
            />

            <form class="max-w-lg border rounded-lg mx-auto">
              <div class="flex flex-col gap-4 p-4 md:p-8">
                <div v-if="!hasMetaMask">
                  <label
                    for="eth"
                    class="
                      dark:text-white
                      inline-block
                      text-gray-800 text-sm
                      sm:text-base
                      mb-2
                    "
                    >ETH address / ENS name</label
                  >
                  <input
                    name="eth"
                    v-model="ethInput"
                    class="
                      w-full
                      bg-gray-50
                      text-gray-800
                      border
                      focus:ring
                      ring-indigo-300
                      rounded
                      outline-none
                      transition
                      duration-100
                      px-3
                      py-2
                      dark:bg-gray-800 dark:text-white
                    "
                  />
                </div>
                <div
                  @click="metamaskConnect"
                  class="
                    block
                    bg-gray-800
                    hover:bg-gray-700
                    active:bg-gray-600
                    focus-visible:ring
                    ring-gray-300
                    text-white text-sm
                    md:text-base
                    font-semibold
                    text-center
                    rounded-lg
                    outline-none
                    transition
                    duration-100
                    px-8
                    py-3
                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
                  "
                  style="cursor: pointer"
                  v-else-if="!isMetaMaskConnected"
                >
                  <MetamaskButton
                    btnMsg="Connect with Metamask"
                    size="medium"
                  />
                </div>
                <div v-else>
                  <p>Your current conected ETH is:</p>
                  <p>
                    <b>{{ ethInput }}</b>
                  </p>
                  <p class="text-sm">
                    Switch address from Metamask if you want to use another.
                  </p>
                </div>

                <div>
                  <label
                    for="password"
                    class="
                      dark:text-white
                      inline-block
                      text-gray-800 text-sm
                      sm:text-base
                      mb-2
                    "
                    >Digit <b>pin</b> from Gather</label
                  >
                  <div
                    style="grid-template-columns: repeat(5, 1fr); width: 18rem"
                    class="grid mx-auto my-4"
                  >
                    <split-input
                      name="password"
                      v-model="passwordInput"
                      class-name="w-9 h-8 rounded-sm p-5 font-bold text-lg  bg-gray-50
                      text-gray-800
                      border
                      focus:ring
                      ring-indigo-300
                      rounded
                      outline-none
                      transition
                      duration-100
                      px-3
                      py-2 dark:bg-gray-800 dark:text-white"
                      :input-number="5"
                    />
                  </div>
                  <!-- <input
                   
                    v-model="passwordInput"
                    class="
                      w-full
                      bg-gray-50
                      text-gray-800
                      border
                      focus:ring
                      ring-indigo-300
                      rounded
                      outline-none
                      transition
                      duration-100
                      px-3
                      py-2
                      dark:bg-gray-800 dark:text-white
                    "
                  /> -->
                </div>

                <button
                  @click.prevent="requestClaimLinkFn()"
                  class="
                    block
                    bg-gray-800
                    hover:bg-gray-700
                    active:bg-gray-600
                    focus-visible:ring
                    ring-gray-300
                    text-white text-sm
                    md:text-base
                    font-semibold
                    text-center
                    rounded-lg
                    outline-none
                    transition
                    duration-100
                    px-8
                    py-3
                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
                  "
                >
                  Claim
                </button>

                <div class="flex justify-center items-center relative">
                  <span class="h-px bg-gray-300 absolute inset-x-0"></span>
                  <span
                    class="
                      dark:bg-gray-800 dark:text-white
                      bg-white
                      text-gray-400 text-sm
                      relative
                      px-4
                    "
                    ><!-- Number of claim links left / Not implemented Yet --></span
                  >
                </div>
              </div>
            </form>
          </div>
          <div v-else>
            <p class="text-xl pb-1">Next Event is schedueled on:</p>
            <p class="text-xl pb-8">
              <b class="text-gray-800 dark:text-gray-100">
                {{ formatedNextDate }}
              </b>
            </p>
            <p class="text-xl">
              Participate in the event and you'll get the password to use on
              this website to claim your POAP.
            </p>
          </div>
        </div>

        <div
          class="
            dark:bg-gray-800 dark:text-white
            flex
            justify-center
            items-center
            bg-gray-100
            p-4
            mb-2
            rounded
          "
        >
          <p class="text-gray-500 text-sm text-center">
            Want to get a <b>POAP</b>? You can get one for participation in the
            meeting held on every <b> Thursday at 11 UTC</b> in:
            <a
              href="https://castle.yup.io"
              class="
                text-indigo-500
                hover:text-indigo-600
                active:text-indigo-700
                transition
                duration-100
              "
              >YUP Gather Space</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRoute, useRouter } from "vue-router";
import { onMounted, inject, ref, reactive, computed, onUnmounted } from "vue";
import { useHead } from "@vueuse/head";
import { postData, nextDayOfWeek } from "@/util/index.js";
import Alert from "@/components/Alert";
import { openInNewTab } from "@/util/index.js";
import Loading from "@/components/Loading";
import MetamaskButton from "@/components/MetamaskButton";
import { ethers } from "ethers";
import SimpleSpinner from "@/components/admin/SimpleSpinner";

export default {
  name: "Home",
  components: {
    Alert,
    Loading,
    MetamaskButton,
    SimpleSpinner,
  },
  setup() {
    const endpointBase = inject("endPointBase");
    const isClaimOpen = ref(false);

    const d = new Date();

    const loadingShow = ref(false);
    const loadingMsg = ref("");

    const ethInput = ref("");
    const passwordInput = ref("");

    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");

    const showClaimBlock = ref(false);
    const claimLink = ref("");
    const claimMsg = ref("");
    const claimETH = ref("");
    const claimENS = ref("");
    const claimPOAPtx = ref("");
    const poapImageUrl = ref("");
    const claimError = ref(false);

    const hasMetaMask = ref(false);
    const isMetaMaskConnected = ref(false);

    const showSimpleSpinner = ref(false);

    const currentDate = {
      claimDate: `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}`,
    };

    const route = useRoute();
    const router = useRouter();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
      timeZoneName: "short",
    };
    const formatedNextDate = ref(
      nextDayOfWeek("thursday").toLocaleDateString("en-US", options)
    );

    const siteData = reactive({
      title: `YUP.io POAP Claim`,
      description: `CLAIM YUP.io POAP`,
    });

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    const requestClaimLinkFn = async () => {
      if (ethInput.value.length === 0) {
        showAlertError("Error", "Please enter your ETH address or ENS name");
        return;
      }

      if (passwordInput.value.length === 0) {
        showAlertError("Error", "Please enter your password from Gather");
        return;
      }

      const isENS = ethInput.value.endsWith(".eth");

      if (!(ethInput.value.match(/^0x[a-fA-F0-9]{40}$/) || isENS)) {
        showAlertError("Error", "Please enter a valid ETH address or ENS name");
        return;
      }

      loadingShow.value = true;
      claimError.value = false;

      const reqData = await postData(`${endpointBase}/request-claim-link`, {
        claimEth: ethInput.value,
        claimDate: currentDate.claimDate,
        claimPassword: passwordInput.value,
      });
      const reqJson = await reqData.json();
      if (reqJson.error) {
        loadingShow.value = false;
        showAlertError("Error", reqJson.error);
      }

      if (reqJson.link) {
        localStorage.setItem(
          `claim-${currentDate.claimDate}`,
          JSON.stringify(isENS ? { ...reqJson, ENS: ethInput.value } : reqJson)
        );
        loadingShow.value = false;
        showClaimBlock.value = true;
        showSimpleSpinner.value = true;

        claimLink.value = reqJson.link;
        claimMsg.value = reqJson.msg;
        claimETH.value = reqJson.by;
        isENS && (claimENS.value = ethInput.value);

        const lastIndex = reqJson.link.lastIndexOf("/");
        const hash = reqJson.link.substring(lastIndex + 1);
        const req = await fetch(
          `https://api.poap.xyz/actions/claim-qr?qr_hash=${hash}`
        );

        if (req.ok) {
          const res = await req.json();
          poapImageUrl.value = res.event.image_url;
          const claimPayload = {
            address: reqJson.by,
            qr_hash: hash,
            secret: res.secret,
          };
          const reqPostClaim = await postData(
            `https://api.poap.xyz/actions/claim-qr`,
            claimPayload
          );

          if (reqPostClaim.status === 400) {
            showSimpleSpinner.value = false;
            claimError.value = true;
            showClaimBlock.value = false;
            showAlertError("Error", (await reqPostClaim.json).message);
            return;
          }

          if (!reqPostClaim.ok) {
            showSimpleSpinner.value = false;
            claimError.value = true;
            showClaimBlock.value = false;
            showAlertError("Error", "Error while claiming");
            return;
          }
          const checkTx = setInterval(() => {
            fetch(`https://api.poap.xyz/actions/claim-qr?qr_hash=${hash}`)
              .then((res) => res.json())
              .then((res) => {
                if (res.tx_hash) {
                  claimPOAPtx.value = res.tx_hash;
                  if (claimPOAPtx.value) {
                    clearInterval(checkTx);
                    showSimpleSpinner.value = false;
                  }
                }
              });
          }, 500);
        } else {
          showAlertError("Error", "Error while claiming");
          showSimpleSpinner.value = false;
          claimError.value = true;
          showClaimBlock.value = false;
        }
      }
    };

    const metamaskConnect = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const account = accounts[0];
      if (account) {
        ethInput.value = account;
        hasMetaMask.value = true;
        isMetaMaskConnected.value = true;
      } else {
        showAlertError("Error", "Please connect to MetaMask");
      }
      return accounts;
    };

    const handleEthChanged = (accounts) => {
      console.log(accounts);
      //console.log(ethInput.value);
      if (accounts.length > 0) {
        ethInput.value = accounts[0];
        hasMetaMask.value = true;
        isMetaMaskConnected.value = true;
      }
    };

    onMounted(async () => {
      const code = "code" in route.params ? route.params.code : null;
      if (code) {
        if (String(code).length === 5 && !isNaN(Number(code))) {
          passwordInput.value = code;
        }
      }
      let alreadyClaimed = localStorage.getItem(
        `claim-${currentDate.claimDate}`
      );

      if (alreadyClaimed) {
        claimError.value = true;
        alreadyClaimed = JSON.parse(alreadyClaimed);
        claimLink.value = alreadyClaimed.link;
        claimETH.value = alreadyClaimed.by;
        if (alreadyClaimed.ENS) {
          claimENS.value = alreadyClaimed.ENS;
        }
        claimMsg.value = "You have already claimed this POAP";
        showClaimBlock.value = true;
      } else {
        loadingMsg.value = "Checking if is posssible to claim today...";
        loadingShow.value = true;
        isClaimOpen.value = (
          await (
            await postData(`${endpointBase}/can-claim-links`, currentDate)
          ).json()
        ).can;

        if (typeof window.ethereum !== "undefined") {
          hasMetaMask.value = true;

          window.ethereum.on("accountsChanged", handleEthChanged);

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            ethInput.value = accounts[0];
            console.log(await metamaskConnect());
            isMetaMaskConnected.value = true;
          }
        }

        loadingShow.value = false;
      }
    });

    onUnmounted(() => {
      if (hasMetaMask.value) {
        window.ethereum.removeListener("accountsChanged", handleEthChanged);
      }
    });

    useHead({
      title: computed(() => siteData.title),
      description: computed(() => siteData.description),
    });

    return {
      router,
      endpointBase,
      isClaimOpen,
      route,
      formatedNextDate,
      ethInput,
      passwordInput,
      requestClaimLinkFn,
      alertHidden,
      alertTitle,
      alertMessage,
      alertType,
      showClaimBlock,
      claimLink,
      claimMsg,
      openInNewTab,
      claimETH,
      claimENS,
      loadingShow,
      loadingMsg,
      hasMetaMask,
      isMetaMaskConnected,
      metamaskConnect,
      showSimpleSpinner,
      claimPOAPtx,
      poapImageUrl,
      claimError,
    };
  },
};
</script>

<style lang="scss">
.blinkTxt {
  animation: blink 2s linear infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
