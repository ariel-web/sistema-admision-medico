<template>
    <div style="width: 100%; display: flex; justify-content: center; background: white; padding: 60px 30px 30px 30px; ">
        <div style=""> 
        <div style="display: flex; width: 700px; min-width: 600; justify-content: center;" >
            <div style="width: 80px; display: flex; justify-content: center;">
                <img src="../../../assets/images/logo/logo.png" width="60"/>
            </div>
            <div style="width: 500px;">
                <div style="text-align: center;"><span style="font-weight: bold; font-size: 12pt; ">UNIVERSIDAD NACIONAL DEL ALTIPLANO</span></div>
                <div style="text-align: center;"><span style="font-weight: bold; font-size: 12pt; ">DIRECCIÓN DE ADMISIÓN</span></div>
                <div style="text-align: center;"><span style="font-weight: bold; font-size: 12pt; ">EXAMEN EXTRAORDINARIO 2023-I</span></div>
            </div>
            <div style="width: 80px; display: flex; justify-content: center;">
                <img src="../../../assets/images/logo/logoDAD.png" width="60"/>
            </div>
        </div>

        <div style="display: flex; width: 700px; justify-content: center;" >
            <span style="font-weight: bold; font-size: 14pt;">CONSTANCIA</span>
        </div>

        <div style="display: flex; width: 700px; justify-content: left;" >
            <div style="text-align: justify; font-size: 11pt;">
                EL JEFE DE LA OFICINA DE SERVICIO MÉDICO PRIMARIO DE LA UNIVERSIDAD
                NACIONAL DEL ALTIPLANO
            </div>
        </div>

        <div style="display: flex; width: 700px; justify-content: left;" >
            <div style="text-align: left; font-size: 11pt;">
                HACE CONSTAR:
            </div>
        </div>

        <div style="display: flex; width: 700px; justify-content: center;" >
            <div style="text-align: justify; font-size: 11pt;">
                Que el Sr(a): <span style="text-transform: uppercase;">{{ postulante.nombres }} {{ postulante.paterno }} {{ postulante.materno }}</span>, identificado con D.N.I. N°: {{ dni }},
                postulante al programa de Estudios de <span style="text-transform: uppercase;">{{ programa }}</span>, ha cumplido con el
                EXAMEN MÉDICO quedando APTO para continuar su inscripción.
            </div>
        </div>

        <div style="display: flex; width: 700px; justify-content: right;" >
            <div style="text-align: right; font-size: 10pt;">
                Puno, 20 de Enero de 2023
            </div>
        </div>

        <div style="display: flex; width: 700px; justify-content: right; margin-top: 60px;">
            <div style="width: 50%;">
                <div style="margin-left:40px; margin-right: 40px; border-top: 1px solid; text-align: center; font-size: 11pt;" >
                    Medico
                </div>
            </div>
            <div style="width: 50%;">
                <div style="margin-left:40px; margin-right: 40px; border-top: 1px solid; text-align: center; font-size: 11pt;" >
                    Jefe
                </div>
            </div>
        </div>
        </div>

        <!-- <div style="background: white; width: 600px; height: 200px;"  > -->

        <!-- <canvas id="myCanvas" width="300" height="200"></canvas> -->
        <!-- </div> -->
    </div>

</template>
   
<script>
export default {
    props:['postulante','programa','dni'],
    mounted() {
        // var c = document.getElementById("myCanvas");
        // var ctx = c.getContext("2d");
        // ctx.font = "12px Arial";
        // ctx.fillText("Hello World", 10, 50);        
    }
}

</script>

