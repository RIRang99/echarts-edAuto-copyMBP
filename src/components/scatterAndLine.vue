<script setup>
    import { ref, reactive,onMounted, watch,watchEffect, computed,onUnmounted,onBeforeUnmount,defineEmits, nextTick} from 'vue'
    import * as echarts from 'echarts'


    // 定义该组件接收到的参数
    const props = defineProps({
        isExpanded: {
            type: Boolean,
        }
    })
    defineEmits(['isExpandedChanged'])
    const { isExpanded } = toRefs(props);
    let resizeObserver = null;
    const arr = [
    0.000000E00,-1.650580E-10,-1.645240E-08,4.514880E-08,5.947040E-08,6.424200E-08,6.906440E-08,7.407930E-08,
1.500000E-02,1.177350E-08,3.630750E-06,2.829200E-05,5.875400E-05,8.499480E-05,1.066320E-04,1.229880E-04,
3.000000E-02,1.797070E-08,6.243760E-06,5.365010E-05,1.145140E-04,1.676130E-04,2.103500E-04,2.432330E-04,
4.500000E-02,2.134640E-08,8.062660E-06,7.637580E-05,1.676750E-04,2.478380E-04,3.125020E-04,3.623500E-04,
6.000000E-02,2.322600E-08,9.319860E-06,9.633170E-05,2.177090E-04,3.250980E-04,4.119220E-04,4.789990E-04,
7.500000E-02,2.437170E-08,1.018190E-05,1.138060E-04,2.651290E-04,4.000960E-04,5.094940E-04,5.941320E-04,
9.000000E-02,2.516570E-08,1.078670E-05,1.288710E-04,3.095470E-04,4.722640E-04,6.045220E-04,7.070560E-04,
1.050000E-01,2.575430E-08,1.123790E-05,1.416130E-04,3.507810E-04,5.411860E-04,6.963520E-04,8.169800E-04,
1.200000E-01,2.621390E-08,1.157500E-05,1.523900E-04,3.891870E-04,6.075520E-04,7.859750E-04,9.249800E-04,
1.350000E-01,2.664010E-08,1.185070E-05,1.613160E-04,4.244570E-04,6.705740E-04,8.722660E-04,1.029650E-03,
1.500000E-01,2.701100E-08,1.208550E-05,1.687550E-04,4.568280E-04,7.307890E-04,9.560210E-04,1.132340E-03,
1.650000E-01,2.732710E-08,1.230980E-05,1.749690E-04,4.864090E-04,7.878970E-04,1.036590E-03,1.232010E-03,
1.800000E-01,2.768210E-08,1.249990E-05,1.800470E-04,5.129620E-04,8.416260E-04,1.113920E-03,1.328520E-03,
1.950000E-01,2.796150E-08,1.267900E-05,1.843930E-04,5.369650E-04,8.925180E-04,1.188560E-03,1.422540E-03,
2.100000E-01,2.832980E-08,1.286230E-05,1.880350E-04,5.583240E-04,9.400940E-04,1.259740E-03,1.513030E-03,
2.250000E-01,2.861260E-08,1.303770E-05,1.911580E-04,5.774310E-04,9.847430E-04,1.328090E-03,1.600910E-03,
2.400000E-01,2.888190E-08,1.318530E-05,1.939400E-04,5.941310E-04,1.026160E-03,1.393370E-03,1.685940E-03,
2.550000E-01,2.915290E-08,1.333810E-05,1.964310E-04,6.088160E-04,1.064460E-03,1.455100E-03,1.767350E-03,
2.700000E-01,2.938340E-08,1.347410E-05,1.985720E-04,6.216240E-04,1.100120E-03,1.514050E-03,1.846030E-03,
2.850000E-01,2.964350E-08,1.362230E-05,2.005820E-04,6.328730E-04,1.132720E-03,1.569630E-03,1.921320E-03,
3.000000E-01,2.989470E-08,1.375400E-05,2.024450E-04,6.427500E-04,1.162690E-03,1.622360E-03,1.993880E-03,
3.150000E-01,3.011920E-08,1.389540E-05,2.041880E-04,6.514170E-04,1.190010E-03,1.672060E-03,2.063330E-03,
3.300000E-01,3.039180E-08,1.399260E-05,2.058790E-04,6.592380E-04,1.214630E-03,1.718480E-03,2.129250E-03,
3.450000E-01,3.068610E-08,1.413950E-05,2.074060E-04,6.658980E-04,1.237110E-03,1.762240E-03,2.192690E-03,
3.600000E-01,3.085500E-08,1.426290E-05,2.089210E-04,6.719940E-04,1.257080E-03,1.802930E-03,2.252760E-03,
3.750000E-01,3.106610E-08,1.438270E-05,2.103980E-04,6.774700E-04,1.275140E-03,1.841040E-03,2.310290E-03,
3.900000E-01,3.124480E-08,1.448380E-05,2.118110E-04,6.822750E-04,1.291450E-03,1.876220E-03,2.364840E-03,
4.050000E-01,3.150740E-08,1.461300E-05,2.131850E-04,6.868460E-04,1.305880E-03,1.908790E-03,2.416260E-03,
4.200000E-01,3.162880E-08,1.473550E-05,2.145110E-04,6.910750E-04,1.319020E-03,1.938790E-03,2.465100E-03,
4.350000E-01,3.185020E-08,1.484570E-05,2.157540E-04,6.949000E-04,1.330650E-03,1.966480E-03,2.510940E-03,
4.500000E-01,3.211570E-08,1.495020E-05,2.170260E-04,6.986870E-04,1.341080E-03,1.991840E-03,2.554430E-03,
4.650000E-01,3.230770E-08,1.505570E-05,2.183430E-04,7.020640E-04,1.350480E-03,2.015130E-03,2.595170E-03,
4.800000E-01,3.250880E-08,1.515860E-05,2.193540E-04,7.053240E-04,1.359060E-03,2.036270E-03,2.633050E-03,
4.950000E-01,3.262390E-08,1.524230E-05,2.205820E-04,7.084430E-04,1.366740E-03,2.055570E-03,2.668730E-03,
5.100000E-01,3.278370E-08,1.535060E-05,2.216710E-04,7.114100E-04,1.373790E-03,2.073050E-03,2.701960E-03,
5.250000E-01,3.287110E-08,1.546230E-05,2.227900E-04,7.142000E-04,1.380330E-03,2.089070E-03,2.732920E-03,
5.400000E-01,3.307200E-08,1.554690E-05,2.238610E-04,7.170800E-04,1.386340E-03,2.103490E-03,2.761660E-03,
5.550000E-01,3.315900E-08,1.564210E-05,2.249270E-04,7.197940E-04,1.391870E-03,2.116630E-03,2.788340E-03,
5.700000E-01,3.337770E-08,1.572580E-05,2.259520E-04,7.223510E-04,1.397240E-03,2.128590E-03,2.812970E-03,
5.850000E-01,3.359150E-08,1.582250E-05,2.269410E-04,7.248940E-04,1.402060E-03,2.139420E-03,2.835570E-03,
6.000000E-01,3.378490E-08,1.590740E-05,2.279600E-04,7.273640E-04,1.406800E-03,2.149410E-03,2.856490E-03,
6.150000E-01,3.386330E-08,1.598430E-05,2.289670E-04,7.297620E-04,1.411270E-03,2.158490E-03,2.875710E-03,
6.300000E-01,3.391800E-08,1.608370E-05,2.299300E-04,7.319990E-04,1.415560E-03,2.166930E-03,2.893460E-03,
6.450000E-01,3.411730E-08,1.615050E-05,2.309680E-04,7.342740E-04,1.419570E-03,2.174600E-03,2.909750E-03,
6.600000E-01,3.425000E-08,1.624600E-05,2.318610E-04,7.366070E-04,1.423450E-03,2.181720E-03,2.924860E-03,
6.750000E-01,3.439170E-08,1.633390E-05,2.327340E-04,7.386830E-04,1.427020E-03,2.188430E-03,2.938540E-03,
6.900000E-01,3.446720E-08,1.641420E-05,2.336490E-04,7.409120E-04,1.430580E-03,2.194820E-03,2.951040E-03,
7.050000E-01,3.468490E-08,1.649170E-05,2.345150E-04,7.429550E-04,1.434070E-03,2.200650E-03,2.962660E-03,
7.200000E-01,3.479830E-08,1.656900E-05,2.354620E-04,7.450670E-04,1.437470E-03,2.206250E-03,2.973180E-03,
7.350000E-01,3.490690E-08,1.664480E-05,2.363310E-04,7.471520E-04,1.440830E-03,2.211510E-03,2.983080E-03,
7.500000E-01,3.493930E-08,1.671970E-05,2.371850E-04,7.492030E-04,1.443920E-03,2.216480E-03,2.992130E-03,
7.650000E-01,3.506360E-08,1.680110E-05,2.380260E-04,7.512030E-04,1.447130E-03,2.221170E-03,3.000670E-03,
7.800000E-01,3.526120E-08,1.687590E-05,2.388620E-04,7.531130E-04,1.450270E-03,2.225680E-03,3.008610E-03,
7.950000E-01,3.536340E-08,1.693330E-05,2.396760E-04,7.550020E-04,1.453120E-03,2.230090E-03,3.015800E-03,
8.100000E-01,3.536060E-08,1.700920E-05,2.404860E-04,7.568310E-04,1.456050E-03,2.234310E-03,3.022820E-03,
8.250000E-01,3.551070E-08,1.708900E-05,2.413200E-04,7.586950E-04,1.458950E-03,2.238460E-03,3.029220E-03,
8.400000E-01,3.564540E-08,1.714970E-05,2.421470E-04,7.604220E-04,1.461750E-03,2.242400E-03,3.035330E-03,
8.550000E-01,3.561930E-08,1.723360E-05,2.429630E-04,7.623450E-04,1.464480E-03,2.246260E-03,3.041200E-03,
8.700000E-01,3.585820E-08,1.727660E-05,2.436980E-04,7.641650E-04,1.467100E-03,2.249960E-03,3.046700E-03,
8.850000E-01,3.598560E-08,1.735320E-05,2.444990E-04,7.657650E-04,1.469700E-03,2.253620E-03,3.051850E-03,
9.000000E-01,3.599000E-08,1.741560E-05,2.452340E-04,7.675150E-04,1.472270E-03,2.257010E-03,3.056950E-03,
9.150000E-01,3.614270E-08,1.746860E-05,2.460110E-04,7.692410E-04,1.474980E-03,2.260500E-03,3.061720E-03,
9.300000E-01,3.620790E-08,1.753930E-05,2.467640E-04,7.709980E-04,1.477490E-03,2.263770E-03,3.066260E-03,
9.450000E-01,3.627030E-08,1.760780E-05,2.474940E-04,7.725990E-04,1.480020E-03,2.267000E-03,3.070790E-03,
9.600000E-01,3.638390E-08,1.765440E-05,2.483040E-04,7.742190E-04,1.482330E-03,2.270190E-03,3.074930E-03,
9.750000E-01,3.644930E-08,1.772830E-05,2.490020E-04,7.758060E-04,1.484740E-03,2.273350E-03,3.079140E-03,
9.900000E-01,3.653110E-08,1.778080E-05,2.498240E-04,7.773210E-04,1.487210E-03,2.276380E-03,3.083130E-03,
1.005000E00,3.660820E-08,1.784090E-05,2.504340E-04,7.790220E-04,1.489440E-03,2.279360E-03,3.087180E-03,
1.020000E00,3.666440E-08,1.790740E-05,2.511520E-04,7.805060E-04,1.491750E-03,2.282440E-03,3.090890E-03,
1.035000E00,3.671690E-08,1.795840E-05,2.517480E-04,7.821040E-04,1.493920E-03,2.285370E-03,3.094580E-03,
1.050000E00,3.678970E-08,1.797970E-05,2.524500E-04,7.836280E-04,1.496150E-03,2.288300E-03,3.098120E-03,
1.065000E00,3.685460E-08,1.806920E-05,2.531230E-04,7.852740E-04,1.498430E-03,2.290900E-03,3.101540E-03,
1.080000E00,3.691780E-08,1.813440E-05,2.538040E-04,7.867760E-04,1.500680E-03,2.293780E-03,3.105170E-03,
1.095000E00,3.702910E-08,1.813940E-05,2.545190E-04,7.881230E-04,1.502730E-03,2.296350E-03,3.108460E-03,
1.110000E00,3.708320E-08,1.821940E-05,2.552130E-04,7.896540E-04,1.504890E-03,2.299020E-03,3.111750E-03,
1.125000E00,3.713740E-08,1.829060E-05,2.559030E-04,7.911200E-04,1.506910E-03,2.301560E-03,3.114920E-03,
1.140000E00,3.717250E-08,1.834850E-05,2.565330E-04,7.925530E-04,1.508870E-03,2.304170E-03,3.118120E-03,
1.155000E00,3.730150E-08,1.839870E-05,2.573170E-04,7.939670E-04,1.511130E-03,2.306790E-03,3.121050E-03,
1.170000E00,3.734200E-08,1.843630E-05,2.579540E-04,7.953180E-04,1.512990E-03,2.309270E-03,3.124050E-03,
1.185000E00,3.737740E-08,1.850110E-05,2.584400E-04,7.967860E-04,1.515070E-03,2.311700E-03,3.126980E-03,
1.200000E00,3.744660E-08,1.855080E-05,2.589980E-04,7.982610E-04,1.516990E-03,2.314130E-03,3.129880E-03,
1.215000E00,3.736820E-08,1.859190E-05,2.596790E-04,7.996610E-04,1.519010E-03,2.316590E-03,3.132660E-03,
1.230000E00,3.759910E-08,1.865170E-05,2.604220E-04,8.009610E-04,1.520890E-03,2.319050E-03,3.135670E-03,
1.245000E00,3.752770E-08,1.866300E-05,2.609660E-04,8.023860E-04,1.522960E-03,2.321340E-03,3.138410E-03,
1.260000E00,3.768770E-08,1.872830E-05,2.616110E-04,8.038050E-04,1.524790E-03,2.323730E-03,3.141130E-03,
1.275000E00,3.767270E-08,1.878540E-05,2.622780E-04,8.050030E-04,1.526520E-03,2.326050E-03,3.143860E-03,
1.290000E00,3.778060E-08,1.882360E-05,2.628430E-04,8.063310E-04,1.528580E-03,2.328230E-03,3.146580E-03,
1.305000E00,3.784580E-08,1.885650E-05,2.634190E-04,8.077220E-04,1.530380E-03,2.330510E-03,3.149150E-03,
1.320000E00,3.783080E-08,1.890140E-05,2.639980E-04,8.088410E-04,1.532290E-03,2.332680E-03,3.151540E-03,
1.335000E00,3.794060E-08,1.891910E-05,2.646480E-04,8.102000E-04,1.534100E-03,2.335000E-03,3.154040E-03,
1.350000E00,3.794130E-08,1.897190E-05,2.651790E-04,8.115230E-04,1.535790E-03,2.337230E-03,3.156630E-03,
1.365000E00,3.795480E-08,1.901510E-05,2.657590E-04,8.128120E-04,1.537580E-03,2.339230E-03,3.158970E-03,
1.380000E00,3.805760E-08,1.901900E-05,2.662850E-04,8.140940E-04,1.539400E-03,2.341390E-03,3.161410E-03,
1.395000E00,3.816910E-08,1.903150E-05,2.668740E-04,8.152750E-04,1.541080E-03,2.343490E-03,3.163880E-03,
1.410000E00,3.814530E-08,1.913970E-05,2.674320E-04,8.165200E-04,1.543060E-03,2.345620E-03,3.166310E-03,
1.425000E00,3.818180E-08,1.918480E-05,2.680400E-04,8.176970E-04,1.544680E-03,2.347550E-03,3.168500E-03,
1.440000E00,3.825100E-08,1.921360E-05,2.685640E-04,8.189380E-04,1.546350E-03,2.349460E-03,3.170830E-03,
1.455000E00,3.834230E-08,1.925390E-05,2.693080E-04,8.200450E-04,1.547980E-03,2.351480E-03,3.173110E-03,
1.470000E00,3.830280E-08,1.928690E-05,2.698350E-04,8.213360E-04,1.549800E-03,2.353710E-03,3.175330E-03,
1.485000E00,3.840680E-08,1.931620E-05,2.703290E-04,8.225810E-04,1.551400E-03,2.355830E-03,3.177520E-03,
1.500000E00,3.838790E-08,1.936720E-05,2.708220E-04,8.237450E-04,1.553110E-03,2.357830E-03,3.179680E-03,
1.515000E00,3.840710E-08,1.939780E-05,2.713850E-04,8.249300E-04,1.554640E-03,2.359470E-03,3.181920E-03,
1.530000E00,3.848240E-08,1.944090E-05,2.719380E-04,8.260710E-04,1.556300E-03,2.361330E-03,3.184120E-03,
1.545000E00,3.851130E-08,1.948190E-05,2.724080E-04,8.271380E-04,1.557870E-03,2.363300E-03,3.186150E-03,
1.560000E00,3.832410E-08,1.948260E-05,2.729480E-04,8.283020E-04,1.559540E-03,2.365410E-03,3.188500E-03,
1.575000E00,3.837530E-08,1.953050E-05,2.734790E-04,8.294180E-04,1.560970E-03,2.367300E-03,3.190510E-03,
1.590000E00,3.842530E-08,1.955990E-05,2.740570E-04,8.306230E-04,1.562640E-03,2.369110E-03,3.192460E-03,
1.605000E00,3.843550E-08,1.960220E-05,2.746210E-04,8.317420E-04,1.564250E-03,2.371070E-03,3.194470E-03,
1.620000E00,3.853210E-08,1.963170E-05,2.751320E-04,8.328250E-04,1.565590E-03,2.372810E-03,3.196590E-03,
1.635000E00,3.848660E-08,1.967640E-05,2.756700E-04,8.339110E-04,1.567220E-03,2.374300E-03,3.198610E-03,
1.650000E00,3.843450E-08,1.972500E-05,2.761610E-04,8.350200E-04,1.568680E-03,2.376380E-03,3.200750E-03
    ]
    const chartContainer = ref(null);
    // 颜色盘
    const color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
    // 记录图例的选中状态
    var selectedLegend = {};

    let currentName = ref('')
    const option = reactive({
        title: {
            text: '散点图DEMO',
            textStyle: {
                fontSize:14
            }
        },
        color:color,
        tooltip: {
            trigger: 'item',
            // axisPointer: {
            //     type: 'cross'
            // },
            appendToBody:true,
            show:true,
            formatter:function(params){
                //如果params.seriesName==='序列5'，将其y值和params.seriesName==='序列4'的y值提取出来，作为返回值，并将两者的差值绝对值也作为返回值，并将差值绝对值除以params.seriesName==='序列4'的y值，作为返回值
                console.log('工具盒',params);
                if(params.seriesName==='序列5'){
                    // 遍历options.series，找到seriesName==='序列4'的series，将其y值提取出来
                    let yValue = 0;
                    option.series.forEach(item=>{
                        if(item.name==='序列4'){
                            yValue = item.data[params.dataIndex][1]
                        }
                    })
                    return params.seriesName+':'+params.value[1].toExponential(7)+'<br/>'+'序列4:'+yValue.toExponential(7)+'<br/>'+'relative:'+(Math.abs(params.value[1]-yValue)).toExponential(7)+'<br/>'+'absolute:'+(((Math.abs(params.value[1]-yValue))/yValue)*100).toFixed(2)+'%'

                }


            }
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

     

        legend:{
            show:true,
            selectedMode:'none',
        },
        grid:{
            top: '12%',
           left: '10%',
           right: '10%',
           bottom: '25%',
      },
        xAxis: {
            type: 'value',
            // 每格最小单位用科学计数法表示，且不会被js引擎默认转化为自然数
            name:'Vds/(V)',
            nameLocation:'center',
            nameTextStyle:{
                overflow:'breakAll',
                width:20,
                fontSize:14,
            },
            
            axisLabel:{
                formatter:function(value){
                    return value.toExponential(4)
                },
                snap:true,
                margin:5
            }
        },
        // graphic:[
        //     {
        //         type:'text',
        //         right:'6%',
        //         top:'10%',
        //         style:{
        //             text:'Vgs',
        //             textAlign:'center',
        //             fontSize:9,
                
        //         }
        //     },
        //     {
        //         type:'text',
        //         left:'center',
        //         top:'center',
        //         style:{
        //             text:'1231231',
        //             textAlign:'center',
        //             fill:'red',
        //             fontSize:14,
        //         }
        //     }
        // ],
        yAxis: [{
            type: 'value',
            name:'Ids/(A)',
            nameGap: 10,
            nameLocation:'center',
            nameTextStyle:{
                fontSize:14,
            },
            axisLabel:{
                snap:true,
                formatter:function(value){
                    return value.toExponential(4).replace(/(\.[0-9]*[1-9])0+e/, '$1e')
                },
            }
        },{
            type:'category',
            name:'Vgs',
            nameGap: 0,
            nameLocation:'end',
            data:[
                '序列1','序列2','序列3','序列4','序列5','序列6','序列7','序列8'
            ],
            nameTextStyle:{
                fontSize:14,
            },
            axisLabel:{
               formatter:function(value){
                

               },
        rich: {


        }
            }
        }],
        // 缩放功能，每个对象可以对应不同类型的缩放模式
        dataZoom:[
            {
                type:'inside',
              },{
                type:'slider',
                // 根据是否展开，设置slider的显示与否
                show:true,
                bottom: 0, // 距离容器底部的位置
                height: 20, // slider的高度
              }
        ],
       toolbox:{
        show:true,
           feature:{
               dataZoom:{
                   show:true,
                   yAxisIndex: "none"
               },
               saveAsImage:{
                   show:true
               },
        
                dataView:{
                    show:true
                }
                

           },
           orient: 'vertical',  // 工具箱纵向排列
           right: 5, // 工具箱距离图表右侧的距离
        },     
     
        series: [

            

            {
                emphasis: {
                disabled:false
                 },
            name: '序列1',
            type: 'scatter',
            
            symbolSize:3,
            //   itemStyle:{
     
            //         color:"blue"

            // },
            data: [
             
            ],
         
  
        }, {
            emphasis: {
                disabled:false
                 },
            name: '序列2',
            type: 'scatter',
            symbolSize:3,
            // itemStyle: {
     
            //         color: "green"
                
            // },
            data: [
             
            ],
        },{
            emphasis: {
                disabled:false
                 },
            name: '序列3',
            type: 'scatter',
            symbolSize:3,
            // itemStyle: {
     
            //         color: "black"
                
            // },
            data: [
              
            ],
        },{
            id:2,
            emphasis: {
                disabled:false
                 },
            name: '序列4',
            type: 'line',
            symbolSize:0,
     
            // itemStyle: {
     
            //         color: "red"
                
            // },
            
            data: [
            
            ],
            smooth:true
        },{
            id:1,
            name: '序列5',
            type: 'scatter',
            symbolSize:3,
            // itemStyle: {
     
            //         color:'red'
                
            // },
            emphasis: {
                disabled:false
                 },
            data: [
               
            ]
        },{
            emphasis: {
                disabled:false
                 },
            name: '序列6',
            type: 'scatter',
            symbolSize:3,
            // itemStyle: {
     
            //         color:'#da70d6'
                
            // },
            data: [
             
            ]
        },{
            emphasis: {
                disabled:false
                 },
            name: '序列7',
            type: 'scatter',
            symbolSize:3,
            // itemStyle: {
     
            //         color:'#8250df'
                
            // },
            data: [
           
            ]
        }
    ]
    })


    let chartInstance 
    //遍历arr，每八个元素为一组，将这八个元素的第一个元素作为x坐标，后面七个元素作为y坐标，然后将这些坐标作为一个对象存入data数组中
    let data = []
    for (let i = 0; i < arr.length; i += 8) {
        data.push({
            x: arr[i],
            y: arr.slice(i + 1, i + 8)
        })
    }
    // 循环series的每一个对象，将data的每一个对象中的x坐标作为series的data中的x坐标，将data的每一个对象中的y坐标作为对应的series的data中的y坐标
    option.series.forEach((item, index) => {
        item.data = data.map(item => {
            return [item.x, item.y[index]]
        })
    })

    // 生成color和series的映射表，series的name和color按顺序一一对应
    let legendColors = {}
    option.series.forEach((item, index) => {
        legendColors[item.name] = color[index]
    })
    console.log(legendColors);


    // echarts实例resiez事件
    const resize = () => {
        chartInstance.resize()
    }
    
    


    // 实现点击图例，对应series的color变为灰色
    const changeSeriesColor = () => {
        chartInstance.on('legendselectchanged', function(params) {
            console.log('图例', params);
  var selected = params.selected;
  var series = chartInstance.getOption().series;

  for (var i = 0; i < series.length; i++) {
    var seriesName = series[i].name;
   if(!selected[seriesName]){
    nextTick(()=>{
    //   为series[i]添加color属性，值为灰色
    series[i].color = '#ccc'
    // 为series[i]添加show属性，值为true
    series[i].show = true
    chartInstance.setOption({
        series: series
    });
    })
 
   }else{
        series[i].color = legendColors[seriesName]
        series[i].show = true
  

   }
 
  }

    chartInstance.setOption({
        series: series
    });
});




    }



    // 在vue3中，由于响应式代理的特性，echarts官方文档不建议直接使用ref或者reactive来代理echarts的实例对象，它会造成许多预料之外的错误，如：
    // 1.tooltips无法显示
    // 2.dataZoom无法使用

    // 所以建议声明一个非响应式的变量来代理echarts实例对象，然后在onMounted钩子函数中初始化echarts实例对象，最后在onUnmounted钩子函数中销毁echarts实例对象，或者使用shallowRef代理echarts实例对象，这样就不会造成上述问题了。
    const chooseSeriseHighLight = ()=>{
       // 监听鼠标移动事件
chartInstance.on('mouseover', function(params) {
  const tooltipVisible = chartInstance.getModel().getComponent('tooltip').option.show; // 判断tooltip是否显示

console.log('params',params);

  if (tooltipVisible) {

  currentName.value = params.seriesName; // 当前鼠标悬浮的 series 的 name
    console.log('currentName',currentName);
            //当currentName===序列5时,找到series中name为序列4的对象，让序列4通过dispatchAction触发高亮,并当鼠标离开当前series时，取消掉高亮
    if (currentName.value === '序列5') {
        chartInstance.dispatchAction({
            type: 'highlight',
            seriesName: '序列4',
        });
       
        }else{
            // 取消高亮
            chartInstance.dispatchAction({
                type: 'downplay',
                seriesName: '序列4',
            });
        }
     



   



  } 
});

    }

    // 实现防抖
    const debounce = (fn, delay) => {
        let timer = null
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, delay)
        }
    }

    // 监听chooseSeriseHighLight防抖，500ms内只会触发一次
    const debounceChooseSeriseHighLight = debounce(chooseSeriseHighLight, 500)

    onMounted( () => {

    chartInstance  =  echarts.init(chartContainer.value);
      chartInstance.setOption(option)
      debounceChooseSeriseHighLight()
      changeSeriesColor()
         // 创建 ResizeObserver 实例，监听父容器的大小变化
     resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(chartContainer.value);

        // 监听 isExpanded 的变化
      watchEffect(() => {
        // 在 isExpanded 变化时执行的逻辑
        // 如果ieExpanded为false,toolbox不显示,datazoom的slider不显示,lengend不显示,如果ieExpanded为true,toolbox显示,datazoom的slider显示,lengend显示,并且调用resize函数，让echarts实例对象重新渲染
        if (isExpanded.value) {
    
            option.grid.top = '12%'
            option.grid.bottom = '25%'
            // option.yAxis.nameGap = 80
            // option.yAxis.forEach(item=>{
            //     item.nameGap = 80
            // })
            option.yAxis[0].nameGap = 80

            option.toolbox.show = true
            option.dataZoom[1].show = true
            option.legend.show = true
            option.tooltip.show = true
            option.title.textStyle.fontSize = 11
            option.xAxis.axisLabel.fontSize = 11
            // option.yAxis.axisLabel.fontSize = 11
            option.yAxis.forEach(item=>{
                item.axisLabel.fontSize = 11
            })
            option.xAxis.nameTextStyle.fontSize = 11
            // option.yAxis.nameTextStyle.fontSize = 11
            option.yAxis.forEach(item=>{
                item.nameTextStyle.fontSize = 11
            })
            chartInstance.setOption(option)
            resize()
        } else {
        
            // option.yAxis.nameGap = 50
            // option.yAxis.forEach(item=>{
            //     item.nameGap = 50
            // })
            option.yAxis[0].nameGap = 50
            option.title.textStyle.fontSize = 8
            option.xAxis.axisLabel.fontSize = 8
            // option.yAxis.axisLabel.fontSize = 8
            option.yAxis.forEach(item=>{
                item.axisLabel.fontSize = 8
            })
            option.xAxis.nameTextStyle.fontSize = 8
            // option.yAxis.nameTextStyle.fontSize = 8
            option.yAxis.forEach(item=>{
                item.nameTextStyle.fontSize = 8
            })
            option.toolbox.show = false
            option.dataZoom[1].show = false
            option.legend.show = false
            option.tooltip.show = false
            chartInstance.setOption(option)
        }
         


      });

    })

 
    onUnmounted(()=>{
        chartInstance.dispose()
    })

   // 在组件销毁前移除窗口缩放事件的监听
    onBeforeUnmount(() => {
     // 停止监听父容器的大小变化
     if (resizeObserver) {
        resizeObserver.disconnect();
      }    });

</script>

<template>
    
    <div ref="chartContainer" style="width:100%;height:100%">
 
    </div>

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