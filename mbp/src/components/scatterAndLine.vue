<script setup>
import {
  ref,
  reactive,
  onMounted,
  watch,
  watchEffect,
  computed,
  onUnmounted,
  onBeforeUnmount,
  defineEmits,
} from "vue";
import * as echarts from "echarts";

// 定义该组件接收到的参数
const props = defineProps({
  isExpanded: {
    type: Boolean,
  },
});
defineEmits(["isExpandedChanged"]);
const { isExpanded } = toRefs(props);

let resizeObserver = null;
const arr = [
  0.0, -1.65058e-10, -1.64524e-8, 4.51488e-8, 5.94704e-8, 6.4242e-8, 6.90644e-8,
  7.40793e-8, 1.5e-2, 1.17735e-8, 3.63075e-6, 2.8292e-5, 5.8754e-5, 8.49948e-5,
  1.06632e-4, 1.22988e-4, 3.0e-2, 1.79707e-8, 6.24376e-6, 5.36501e-5,
  1.14514e-4, 1.67613e-4, 2.1035e-4, 2.43233e-4, 4.5e-2, 2.13464e-8, 8.06266e-6,
  7.63758e-5, 1.67675e-4, 2.47838e-4, 3.12502e-4, 3.6235e-4, 6.0e-2, 2.3226e-8,
  9.31986e-6, 9.63317e-5, 2.17709e-4, 3.25098e-4, 4.11922e-4, 4.78999e-4,
  7.5e-2, 2.43717e-8, 1.01819e-5, 1.13806e-4, 2.65129e-4, 4.00096e-4,
  5.09494e-4, 5.94132e-4, 9.0e-2, 2.51657e-8, 1.07867e-5, 1.28871e-4,
  3.09547e-4, 4.72264e-4, 6.04522e-4, 7.07056e-4, 1.05e-1, 2.57543e-8,
  1.12379e-5, 1.41613e-4, 3.50781e-4, 5.41186e-4, 6.96352e-4, 8.1698e-4, 1.2e-1,
  2.62139e-8, 1.1575e-5, 1.5239e-4, 3.89187e-4, 6.07552e-4, 7.85975e-4,
  9.2498e-4, 1.35e-1, 2.66401e-8, 1.18507e-5, 1.61316e-4, 4.24457e-4,
  6.70574e-4, 8.72266e-4, 1.02965e-3, 1.5e-1, 2.7011e-8, 1.20855e-5, 1.68755e-4,
  4.56828e-4, 7.30789e-4, 9.56021e-4, 1.13234e-3, 1.65e-1, 2.73271e-8,
  1.23098e-5, 1.74969e-4, 4.86409e-4, 7.87897e-4, 1.03659e-3, 1.23201e-3,
  1.8e-1, 2.76821e-8, 1.24999e-5, 1.80047e-4, 5.12962e-4, 8.41626e-4,
  1.11392e-3, 1.32852e-3, 1.95e-1, 2.79615e-8, 1.2679e-5, 1.84393e-4,
  5.36965e-4, 8.92518e-4, 1.18856e-3, 1.42254e-3, 2.1e-1, 2.83298e-8,
  1.28623e-5, 1.88035e-4, 5.58324e-4, 9.40094e-4, 1.25974e-3, 1.51303e-3,
  2.25e-1, 2.86126e-8, 1.30377e-5, 1.91158e-4, 5.77431e-4, 9.84743e-4,
  1.32809e-3, 1.60091e-3, 2.4e-1, 2.88819e-8, 1.31853e-5, 1.9394e-4, 5.94131e-4,
  1.02616e-3, 1.39337e-3, 1.68594e-3, 2.55e-1, 2.91529e-8, 1.33381e-5,
  1.96431e-4, 6.08816e-4, 1.06446e-3, 1.4551e-3, 1.76735e-3, 2.7e-1, 2.93834e-8,
  1.34741e-5, 1.98572e-4, 6.21624e-4, 1.10012e-3, 1.51405e-3, 1.84603e-3,
  2.85e-1, 2.96435e-8, 1.36223e-5, 2.00582e-4, 6.32873e-4, 1.13272e-3,
  1.56963e-3, 1.92132e-3, 3.0e-1, 2.98947e-8, 1.3754e-5, 2.02445e-4, 6.4275e-4,
  1.16269e-3, 1.62236e-3, 1.99388e-3, 3.15e-1, 3.01192e-8, 1.38954e-5,
  2.04188e-4, 6.51417e-4, 1.19001e-3, 1.67206e-3, 2.06333e-3, 3.3e-1,
  3.03918e-8, 1.39926e-5, 2.05879e-4, 6.59238e-4, 1.21463e-3, 1.71848e-3,
  2.12925e-3, 3.45e-1, 3.06861e-8, 1.41395e-5, 2.07406e-4, 6.65898e-4,
  1.23711e-3, 1.76224e-3, 2.19269e-3, 3.6e-1, 3.0855e-8, 1.42629e-5, 2.08921e-4,
  6.71994e-4, 1.25708e-3, 1.80293e-3, 2.25276e-3, 3.75e-1, 3.10661e-8,
  1.43827e-5, 2.10398e-4, 6.7747e-4, 1.27514e-3, 1.84104e-3, 2.31029e-3, 3.9e-1,
  3.12448e-8, 1.44838e-5, 2.11811e-4, 6.82275e-4, 1.29145e-3, 1.87622e-3,
  2.36484e-3, 4.05e-1, 3.15074e-8, 1.4613e-5, 2.13185e-4, 6.86846e-4,
  1.30588e-3, 1.90879e-3, 2.41626e-3, 4.2e-1, 3.16288e-8, 1.47355e-5,
  2.14511e-4, 6.91075e-4, 1.31902e-3, 1.93879e-3, 2.4651e-3, 4.35e-1,
  3.18502e-8, 1.48457e-5, 2.15754e-4, 6.949e-4, 1.33065e-3, 1.96648e-3,
  2.51094e-3, 4.5e-1, 3.21157e-8, 1.49502e-5, 2.17026e-4, 6.98687e-4,
  1.34108e-3, 1.99184e-3, 2.55443e-3, 4.65e-1, 3.23077e-8, 1.50557e-5,
  2.18343e-4, 7.02064e-4, 1.35048e-3, 2.01513e-3, 2.59517e-3, 4.8e-1,
  3.25088e-8, 1.51586e-5, 2.19354e-4, 7.05324e-4, 1.35906e-3, 2.03627e-3,
  2.63305e-3, 4.95e-1, 3.26239e-8, 1.52423e-5, 2.20582e-4, 7.08443e-4,
  1.36674e-3, 2.05557e-3, 2.66873e-3, 5.1e-1, 3.27837e-8, 1.53506e-5,
  2.21671e-4, 7.1141e-4, 1.37379e-3, 2.07305e-3, 2.70196e-3, 5.25e-1,
  3.28711e-8, 1.54623e-5, 2.2279e-4, 7.142e-4, 1.38033e-3, 2.08907e-3,
  2.73292e-3, 5.4e-1, 3.3072e-8, 1.55469e-5, 2.23861e-4, 7.1708e-4, 1.38634e-3,
  2.10349e-3, 2.76166e-3, 5.55e-1, 3.3159e-8, 1.56421e-5, 2.24927e-4,
  7.19794e-4, 1.39187e-3, 2.11663e-3, 2.78834e-3, 5.7e-1, 3.33777e-8,
  1.57258e-5, 2.25952e-4, 7.22351e-4, 1.39724e-3, 2.12859e-3, 2.81297e-3,
  5.85e-1, 3.35915e-8, 1.58225e-5, 2.26941e-4, 7.24894e-4, 1.40206e-3,
  2.13942e-3, 2.83557e-3, 6.0e-1, 3.37849e-8, 1.59074e-5, 2.2796e-4, 7.27364e-4,
  1.4068e-3, 2.14941e-3, 2.85649e-3, 6.15e-1, 3.38633e-8, 1.59843e-5,
  2.28967e-4, 7.29762e-4, 1.41127e-3, 2.15849e-3, 2.87571e-3, 6.3e-1, 3.3918e-8,
  1.60837e-5, 2.2993e-4, 7.31999e-4, 1.41556e-3, 2.16693e-3, 2.89346e-3,
  6.45e-1, 3.41173e-8, 1.61505e-5, 2.30968e-4, 7.34274e-4, 1.41957e-3,
  2.1746e-3, 2.90975e-3, 6.6e-1, 3.425e-8, 1.6246e-5, 2.31861e-4, 7.36607e-4,
  1.42345e-3, 2.18172e-3, 2.92486e-3, 6.75e-1, 3.43917e-8, 1.63339e-5,
  2.32734e-4, 7.38683e-4, 1.42702e-3, 2.18843e-3, 2.93854e-3, 6.9e-1,
  3.44672e-8, 1.64142e-5, 2.33649e-4, 7.40912e-4, 1.43058e-3, 2.19482e-3,
  2.95104e-3, 7.05e-1, 3.46849e-8, 1.64917e-5, 2.34515e-4, 7.42955e-4,
  1.43407e-3, 2.20065e-3, 2.96266e-3, 7.2e-1, 3.47983e-8, 1.6569e-5, 2.35462e-4,
  7.45067e-4, 1.43747e-3, 2.20625e-3, 2.97318e-3, 7.35e-1, 3.49069e-8,
  1.66448e-5, 2.36331e-4, 7.47152e-4, 1.44083e-3, 2.21151e-3, 2.98308e-3,
  7.5e-1, 3.49393e-8, 1.67197e-5, 2.37185e-4, 7.49203e-4, 1.44392e-3,
  2.21648e-3, 2.99213e-3, 7.65e-1, 3.50636e-8, 1.68011e-5, 2.38026e-4,
  7.51203e-4, 1.44713e-3, 2.22117e-3, 3.00067e-3, 7.8e-1, 3.52612e-8,
  1.68759e-5, 2.38862e-4, 7.53113e-4, 1.45027e-3, 2.22568e-3, 3.00861e-3,
  7.95e-1, 3.53634e-8, 1.69333e-5, 2.39676e-4, 7.55002e-4, 1.45312e-3,
  2.23009e-3, 3.0158e-3, 8.1e-1, 3.53606e-8, 1.70092e-5, 2.40486e-4, 7.56831e-4,
  1.45605e-3, 2.23431e-3, 3.02282e-3, 8.25e-1, 3.55107e-8, 1.7089e-5, 2.4132e-4,
  7.58695e-4, 1.45895e-3, 2.23846e-3, 3.02922e-3, 8.4e-1, 3.56454e-8,
  1.71497e-5, 2.42147e-4, 7.60422e-4, 1.46175e-3, 2.2424e-3, 3.03533e-3,
  8.55e-1, 3.56193e-8, 1.72336e-5, 2.42963e-4, 7.62345e-4, 1.46448e-3,
  2.24626e-3, 3.0412e-3, 8.7e-1, 3.58582e-8, 1.72766e-5, 2.43698e-4, 7.64165e-4,
  1.4671e-3, 2.24996e-3, 3.0467e-3, 8.85e-1, 3.59856e-8, 1.73532e-5, 2.44499e-4,
  7.65765e-4, 1.4697e-3, 2.25362e-3, 3.05185e-3, 9.0e-1, 3.599e-8, 1.74156e-5,
  2.45234e-4, 7.67515e-4, 1.47227e-3, 2.25701e-3, 3.05695e-3, 9.15e-1,
  3.61427e-8, 1.74686e-5, 2.46011e-4, 7.69241e-4, 1.47498e-3, 2.2605e-3,
  3.06172e-3, 9.3e-1, 3.62079e-8, 1.75393e-5, 2.46764e-4, 7.70998e-4,
  1.47749e-3, 2.26377e-3, 3.06626e-3, 9.45e-1, 3.62703e-8, 1.76078e-5,
  2.47494e-4, 7.72599e-4, 1.48002e-3, 2.267e-3, 3.07079e-3, 9.6e-1, 3.63839e-8,
  1.76544e-5, 2.48304e-4, 7.74219e-4, 1.48233e-3, 2.27019e-3, 3.07493e-3,
  9.75e-1, 3.64493e-8, 1.77283e-5, 2.49002e-4, 7.75806e-4, 1.48474e-3,
  2.27335e-3, 3.07914e-3, 9.9e-1, 3.65311e-8, 1.77808e-5, 2.49824e-4,
  7.77321e-4, 1.48721e-3, 2.27638e-3, 3.08313e-3, 1.005, 3.66082e-8, 1.78409e-5,
  2.50434e-4, 7.79022e-4, 1.48944e-3, 2.27936e-3, 3.08718e-3, 1.02, 3.66644e-8,
  1.79074e-5, 2.51152e-4, 7.80506e-4, 1.49175e-3, 2.28244e-3, 3.09089e-3, 1.035,
  3.67169e-8, 1.79584e-5, 2.51748e-4, 7.82104e-4, 1.49392e-3, 2.28537e-3,
  3.09458e-3, 1.05, 3.67897e-8, 1.79797e-5, 2.5245e-4, 7.83628e-4, 1.49615e-3,
  2.2883e-3, 3.09812e-3, 1.065, 3.68546e-8, 1.80692e-5, 2.53123e-4, 7.85274e-4,
  1.49843e-3, 2.2909e-3, 3.10154e-3, 1.08, 3.69178e-8, 1.81344e-5, 2.53804e-4,
  7.86776e-4, 1.50068e-3, 2.29378e-3, 3.10517e-3, 1.095, 3.70291e-8, 1.81394e-5,
  2.54519e-4, 7.88123e-4, 1.50273e-3, 2.29635e-3, 3.10846e-3, 1.11, 3.70832e-8,
  1.82194e-5, 2.55213e-4, 7.89654e-4, 1.50489e-3, 2.29902e-3, 3.11175e-3, 1.125,
  3.71374e-8, 1.82906e-5, 2.55903e-4, 7.9112e-4, 1.50691e-3, 2.30156e-3,
  3.11492e-3, 1.14, 3.71725e-8, 1.83485e-5, 2.56533e-4, 7.92553e-4, 1.50887e-3,
  2.30417e-3, 3.11812e-3, 1.155, 3.73015e-8, 1.83987e-5, 2.57317e-4, 7.93967e-4,
  1.51113e-3, 2.30679e-3, 3.12105e-3, 1.17, 3.7342e-8, 1.84363e-5, 2.57954e-4,
  7.95318e-4, 1.51299e-3, 2.30927e-3, 3.12405e-3, 1.185, 3.73774e-8, 1.85011e-5,
  2.5844e-4, 7.96786e-4, 1.51507e-3, 2.3117e-3, 3.12698e-3, 1.2, 3.74466e-8,
  1.85508e-5, 2.58998e-4, 7.98261e-4, 1.51699e-3, 2.31413e-3, 3.12988e-3, 1.215,
  3.73682e-8, 1.85919e-5, 2.59679e-4, 7.99661e-4, 1.51901e-3, 2.31659e-3,
  3.13266e-3, 1.23, 3.75991e-8, 1.86517e-5, 2.60422e-4, 8.00961e-4, 1.52089e-3,
  2.31905e-3, 3.13567e-3, 1.245, 3.75277e-8, 1.8663e-5, 2.60966e-4, 8.02386e-4,
  1.52296e-3, 2.32134e-3, 3.13841e-3, 1.26, 3.76877e-8, 1.87283e-5, 2.61611e-4,
  8.03805e-4, 1.52479e-3, 2.32373e-3, 3.14113e-3, 1.275, 3.76727e-8, 1.87854e-5,
  2.62278e-4, 8.05003e-4, 1.52652e-3, 2.32605e-3, 3.14386e-3, 1.29, 3.77806e-8,
  1.88236e-5, 2.62843e-4, 8.06331e-4, 1.52858e-3, 2.32823e-3, 3.14658e-3, 1.305,
  3.78458e-8, 1.88565e-5, 2.63419e-4, 8.07722e-4, 1.53038e-3, 2.33051e-3,
  3.14915e-3, 1.32, 3.78308e-8, 1.89014e-5, 2.63998e-4, 8.08841e-4, 1.53229e-3,
  2.33268e-3, 3.15154e-3, 1.335, 3.79406e-8, 1.89191e-5, 2.64648e-4, 8.102e-4,
  1.5341e-3, 2.335e-3, 3.15404e-3, 1.35, 3.79413e-8, 1.89719e-5, 2.65179e-4,
  8.11523e-4, 1.53579e-3, 2.33723e-3, 3.15663e-3, 1.365, 3.79548e-8, 1.90151e-5,
  2.65759e-4, 8.12812e-4, 1.53758e-3, 2.33923e-3, 3.15897e-3, 1.38, 3.80576e-8,
  1.9019e-5, 2.66285e-4, 8.14094e-4, 1.5394e-3, 2.34139e-3, 3.16141e-3, 1.395,
  3.81691e-8, 1.90315e-5, 2.66874e-4, 8.15275e-4, 1.54108e-3, 2.34349e-3,
  3.16388e-3, 1.41, 3.81453e-8, 1.91397e-5, 2.67432e-4, 8.1652e-4, 1.54306e-3,
  2.34562e-3, 3.16631e-3, 1.425, 3.81818e-8, 1.91848e-5, 2.6804e-4, 8.17697e-4,
  1.54468e-3, 2.34755e-3, 3.1685e-3, 1.44, 3.8251e-8, 1.92136e-5, 2.68564e-4,
  8.18938e-4, 1.54635e-3, 2.34946e-3, 3.17083e-3, 1.455, 3.83423e-8, 1.92539e-5,
  2.69308e-4, 8.20045e-4, 1.54798e-3, 2.35148e-3, 3.17311e-3, 1.47, 3.83028e-8,
  1.92869e-5, 2.69835e-4, 8.21336e-4, 1.5498e-3, 2.35371e-3, 3.17533e-3, 1.485,
  3.84068e-8, 1.93162e-5, 2.70329e-4, 8.22581e-4, 1.5514e-3, 2.35583e-3,
  3.17752e-3, 1.5, 3.83879e-8, 1.93672e-5, 2.70822e-4, 8.23745e-4, 1.55311e-3,
  2.35783e-3, 3.17968e-3, 1.515, 3.84071e-8, 1.93978e-5, 2.71385e-4, 8.2493e-4,
  1.55464e-3, 2.35947e-3, 3.18192e-3, 1.53, 3.84824e-8, 1.94409e-5, 2.71938e-4,
  8.26071e-4, 1.5563e-3, 2.36133e-3, 3.18412e-3, 1.545, 3.85113e-8, 1.94819e-5,
  2.72408e-4, 8.27138e-4, 1.55787e-3, 2.3633e-3, 3.18615e-3, 1.56, 3.83241e-8,
  1.94826e-5, 2.72948e-4, 8.28302e-4, 1.55954e-3, 2.36541e-3, 3.1885e-3, 1.575,
  3.83753e-8, 1.95305e-5, 2.73479e-4, 8.29418e-4, 1.56097e-3, 2.3673e-3,
  3.19051e-3, 1.59, 3.84253e-8, 1.95599e-5, 2.74057e-4, 8.30623e-4, 1.56264e-3,
  2.36911e-3, 3.19246e-3, 1.605, 3.84355e-8, 1.96022e-5, 2.74621e-4, 8.31742e-4,
  1.56425e-3, 2.37107e-3, 3.19447e-3, 1.62, 3.85321e-8, 1.96317e-5, 2.75132e-4,
  8.32825e-4, 1.56559e-3, 2.37281e-3, 3.19659e-3, 1.635, 3.84866e-8, 1.96764e-5,
  2.7567e-4, 8.33911e-4, 1.56722e-3, 2.3743e-3, 3.19861e-3, 1.65, 3.84345e-8,
  1.9725e-5, 2.76161e-4, 8.3502e-4, 1.56868e-3, 2.37638e-3, 3.20075e-3,
];
const chartContainer = ref(null);

let currentName = ref("");

const option = reactive({
  title: {
    text: "散点图DEMO",
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: "item",
    // axisPointer: {
    //     type: 'cross'
    // },
    appendToBody: true,
    show: true,
    formatter: function (params) {
      //如果params.seriesName==='序列5'，将其y值和params.seriesName==='序列4'的y值提取出来，作为返回值，并将两者的差值绝对值也作为返回值，并将差值绝对值除以params.seriesName==='序列4'的y值，作为返回值
      console.log("工具盒", params);
      if (params.seriesName === "序列5") {
        // 遍历options.series，找到seriesName==='序列4'的series，将其y值提取出来
        let yValue = 0;
        option.series.forEach((item) => {
          if (item.name === "序列4") {
            yValue = item.data[params.dataIndex][1];
          }
        });
        return (
          params.seriesName +
          ":" +
          params.value[1].toExponential(7) +
          "<br/>" +
          "序列4:" +
          yValue.toExponential(7) +
          "<br/>" +
          "relative:" +
          Math.abs(params.value[1] - yValue).toExponential(7) +
          "<br/>" +
          "absolute:" +
          ((Math.abs(params.value[1] - yValue) / yValue) * 100).toFixed(2) +
          "%"
        );
      }
    },
    // formatter:function (params) {
    //     // 遍历params，将params中在相同x坐标上对应的所有存在散点的y值提取出来，然后将这些y值按照从小到大的顺序排列，最后将这些y值拼接成一个字符串，作为tooltip的返回值
    //     console.log(params);
    //     let yValues = []
    //     params.forEach(item=>{
    //     //    如果seriesName存在"序列"2个字，说明是散点图，将其y值和对应的seriesName作为一个对象存入yValues数组中
    //         if(item.seriesName.includes('序列')){
    //             yValues.push({
    //                 y:item.value[1],
    //                 seriesName:item.seriesName
    //             })
    //         }
    //     })
    //     // 返回值为如下格式x:x坐标的值,seriesName1:y值1,seriesName2:y值2,seriesName3:y值3
    //     return `x坐标:${params[0].value[0]}</br>${yValues.sort((a,b)=>a.y-b.y).map(item=>`${item.seriesName}:${item.y}`).join('</br>')}`
    // }
  },

  legend: {
    show: true,
  },
  grid: {
    // top: '12%',
    left: "10%",
    right: "10%",
    // bottom: '20%',
  },
  xAxis: {
    type: "value",
    // 每格最小单位用科学计数法表示，且不会被js引擎默认转化为自然数
    name: "Vds/(V)",
    nameLocation: "center",
    nameTextStyle: {
      overflow: "breakAll",
      width: 20,
      fontSize: 14,
    },

    axisLabel: {
      formatter: function (value) {
        return value.toExponential(4);
      },
      snap: true,
      margin: 5,
    },
  },
  yAxis: {
    type: "value",
    name: "Ids/(A)",
    nameGap: 10,
    nameLocation: "center",
    nameTextStyle: {
      fontSize: 14,
    },
    axisLabel: {
      snap: true,
      formatter: function (value) {
        return value.toExponential(4).replace(/(\.[0-9]*[1-9])0+e/, "$1e");
      },
    },
  },
  // 缩放功能，每个对象可以对应不同类型的缩放模式
  dataZoom: [
    {
      type: "inside",
    },
    {
      type: "slider",
      // 根据是否展开，设置slider的显示与否
      show: true,
      bottom: 0, // 距离容器底部的位置
      height: 20, // slider的高度
    },
  ],
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        show: true,
        yAxisIndex: "none",
      },
      saveAsImage: {
        show: true,
      },

      dataView: {
        show: true,
      },
    },
    orient: "vertical", // 工具箱纵向排列
    right: 20, // 工具箱距离图表右侧的距离
  },

  series: [
    {
      emphasis: {
        disabled: false,
      },
      name: "序列1",
      type: "scatter",

      symbolSize: 3,
      itemStyle: {
        color: "blue",
      },
      data: [],
    },
    {
      emphasis: {
        disabled: false,
      },
      name: "序列2",
      type: "scatter",
      symbolSize: 3,
      itemStyle: {
        color: "green",
      },
      data: [],
    },
    {
      emphasis: {
        disabled: false,
      },
      name: "序列3",
      type: "scatter",
      symbolSize: 3,
      itemStyle: {
        color: "black",
      },
      data: [],
    },
    {
      id: 2,
      emphasis: {
        disabled: false,
      },
      name: "序列4",
      type: "line",
      symbolSize: 0,

      itemStyle: {
        color: "red",
      },
      data: [],
      smooth: true,
    },
    {
      id: 1,
      name: "序列5",
      type: "scatter",
      symbolSize: 3,
      itemStyle: {
        color: "red",
      },
      emphasis: {
        disabled: false,
      },
      data: [],
    },
    {
      emphasis: {
        disabled: false,
      },
      name: "序列6",
      type: "scatter",
      symbolSize: 3,
      itemStyle: {
        color: "#da70d6",
      },
      data: [],
    },
    {
      emphasis: {
        disabled: false,
      },
      name: "序列7",
      type: "scatter",
      symbolSize: 3,
      itemStyle: {
        color: "#8250df",
      },
      data: [],
    },
  ],
});

let chartInstance;
//遍历arr，每八个元素为一组，将这八个元素的第一个元素作为x坐标，后面七个元素作为y坐标，然后将这些坐标作为一个对象存入data数组中
let data = [];
for (let i = 0; i < arr.length; i += 8) {
  data.push({
    x: arr[i],
    y: arr.slice(i + 1, i + 8),
  });
}
// 循环series的每一个对象，将data的每一个对象中的x坐标作为series的data中的x坐标，将data的每一个对象中的y坐标作为对应的series的data中的y坐标
option.series.forEach((item, index) => {
  item.data = data.map((item) => {
    return [item.x, item.y[index]];
  });
});

// echarts实例resiez事件
const resize = () => {
  chartInstance.resize();
};

// 在vue3中，由于响应式代理的特性，echarts官方文档不建议直接使用ref或者reactive来代理echarts的实例对象，它会造成许多预料之外的错误，如：
// 1.tooltips无法显示
// 2.dataZoom无法使用

// 所以建议声明一个非响应式的变量来代理echarts实例对象，然后在onMounted钩子函数中初始化echarts实例对象，最后在onUnmounted钩子函数中销毁echarts实例对象，或者使用shallowRef代理echarts实例对象，这样就不会造成上述问题了。
const chooseSeriseHighLight = () => {
  // 监听鼠标移动事件
  chartInstance.on("mouseover", function (params) {
    const tooltipVisible = chartInstance.getModel().getComponent("tooltip")
      .option.show; // 判断tooltip是否显示

    console.log("params", params);

    if (tooltipVisible) {
      currentName.value = params.seriesName; // 当前鼠标悬浮的 series 的 name
      console.log("currentName", currentName);
      //当currentName===序列5时,找到series中name为序列4的对象，让序列4通过dispatchAction触发高亮,并当鼠标离开当前series时，取消掉高亮
      if (currentName.value === "序列5") {
        chartInstance.dispatchAction({
          type: "highlight",
          seriesName: "序列4",
        });
      } else {
        // 取消高亮
        chartInstance.dispatchAction({
          type: "downplay",
          seriesName: "序列4",
        });
      }
    }
  });
};

// 实现防抖
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

// 监听chooseSeriseHighLight防抖，500ms内只会触发一次
const debounceChooseSeriseHighLight = debounce(chooseSeriseHighLight, 500);

onMounted(() => {
  chartInstance = echarts.init(chartContainer.value);
  chartInstance.setOption(option);
  debounceChooseSeriseHighLight();

  // 创建 ResizeObserver 实例，监听父容器的大小变化
  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(chartContainer.value);

  // 监听 isExpanded 的变化
  watchEffect(() => {
    // 在 isExpanded 变化时执行的逻辑
    // 如果ieExpanded为false,toolbox不显示,datazoom的slider不显示,lengend不显示,如果ieExpanded为true,toolbox显示,datazoom的slider显示,lengend显示,并且调用resize函数，让echarts实例对象重新渲染
    if (isExpanded.value) {
      // option.grid.top = "12%";
      // option.grid.bottom = "25%";
      option.yAxis.nameGap = 80;
      option.toolbox.show = true;
      option.dataZoom[1].show = true;
      option.legend.show = true;
      option.tooltip.show = true;
      option.title.textStyle.fontSize = 11;
      option.xAxis.axisLabel.fontSize = 11;
      option.yAxis.axisLabel.fontSize = 11;
      option.xAxis.nameTextStyle.fontSize = 11;
      option.yAxis.nameTextStyle.fontSize = 11;
      chartInstance.setOption(option);
      resize();
    } else {
      // option.grid.top = 60;
      // option.grid.bottom = 70;
      option.yAxis.nameGap = 50;
      option.title.textStyle.fontSize = 8;
      option.xAxis.axisLabel.fontSize = 8;
      option.yAxis.axisLabel.fontSize = 8;
      option.xAxis.nameTextStyle.fontSize = 8;
      option.yAxis.nameTextStyle.fontSize = 8;
      option.toolbox.show = false;
      option.dataZoom[1].show = false;
      option.legend.show = false;
      option.tooltip.show = false;
      chartInstance.setOption(option);
    }
  });
});

onUnmounted(() => {
  chartInstance.dispose();
});

// 在组件销毁前移除窗口缩放事件的监听
onBeforeUnmount(() => {
  // 停止监听父容器的大小变化
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div ref="chartContainer" style="width: 100%; height: 100%"></div>
</template>

<style scoped lang="scss">
/* 媒体查询，根据父盒子的宽度调整字体大小 */
/* @media screen and (max-width: 700px) {
  .chart-container {
    font-size: 8px;
  }
}

@media screen and (min-width: 610px) and (max-width: 1200px) {
  .chart-container {
    font-size: 11px;
  }
} */
</style>
