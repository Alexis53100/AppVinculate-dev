import React from 'react';
import { useWindowDimensions, Image, ScrollView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";

import RenderHtml from 'react-native-render-html';



const SaludMental = ({ navigation, route }) => {
    
    const { usuario, idUsuario, idEmpresa, empresaData } = route.params;
    const { width } = useWindowDimensions();

    const widthHtml = width;

    const source = {
        html: `
        <p class="s5" style="text-align: justify;"><span class="s3">En el contexto laboral actual, m&aacute;s all&aacute; de las habilidades t&eacute;cnicas, <strong>las competencias socioemocionales son fundamentales</strong>. </span></p>
        <p class="s5" style="text-align: justify;"><span class="s3">Este espacio te guiar&aacute; a trav&eacute;s de 5 competencias esenciales para tener &eacute;xito en el mundo laboral, desde la comunicaci&oacute;n efectiva hasta la creatividad e innovaci&oacute;n. Aprende c&oacute;mo estas competencias pueden mejorar tu val&iacute;a en el mercado laboral y abrir nuevas oportunidades.</span></p>
        <p class="s5" style="text-align: justify;">&nbsp;</p>
        <h3 style="text-align: center;"><strong><span class="s3">&iexcl;Comencemos</span><span class="s3">!</span></strong></h3>
        <p>&nbsp;</p>
        <h3><span class="s13">1: </span><span class="s14">Reconocer nuestras emociones</span></h3>
       
        <p><strong><span class="s2">Autoconciencia&nbsp;Emocional</span></strong></p>
        <p class="s21" style="text-align: justify;" ><span class="s23">Consiste en elevar a un plano consciente las emociones. Las personas que poseen esta capacidad est&aacute;n en sinton&iacute;a con sus sentimientos, conocen como afectan su rendimiento laboral y los usan conscientemente para tomar decisiones. Los l&iacute;deres emocionalmente conscientes de s&iacute; mismos son aut&eacute;nticos y capaces de hablar abiertamente sobre sus emociones.</span></p>
        <div class="s19">&nbsp;</div>
        <div class="s19">&nbsp;</div>
        <h3><span class="s18"><span class="s20">2-</span> <span class="s14">Saber manejar las emociones</span></span></h3>
        <p class="s21"><strong><span class="s22">Autorregulaci&oacute;n emocional </span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Una vez que aparece la emoci&oacute;n y se es consciente de ella, se gestiona para que no obstaculice el comportamiento.</span></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Nos ayuda a lograr permanecer calmados en situaciones estresantes para de esta forma tomar las decisiones m&aacute;s acertadas.</span></p>
        <p class="s21">&nbsp;</p>
        <p class="s21"><strong><span class="s22">Gesti&oacute;n de emociones</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Las personas que gestionan adecuadamente sus emociones son capaces de reconocerlas, darles un nombre y modularlas. Facilita la comunicaci&oacute;n asertiva al clarificar la propia emoci&oacute;n y facilitar el reconocimiento de los estados emocionales en los otros</span></p>
        <p class="s21">&nbsp;</p>
        <p class="s21"><strong><span class="s22">Orientaci&oacute;n al resultado</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Las personas con capacidad de orientarse a los resultados trabajan hacia objetivos desafiantes y medibles. Buscan continuamente maneras de mejorar su rendimiento y el de su equipo.</span></p>
        <p class="s21">&nbsp;</p>
        <p class="s21"><strong><span class="s22">Optimismo</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Las personas con un elevado grado de optimismo ven cada situaci&oacute;n como una oportunidad, incluso aquellas que pueden parecer un rev&eacute;s para otros. Por regla general ven a otras personas positivamente y esperan que hagan lo mejor posible. Su visi&oacute;n a futuro es mejor.</span></p>
        <p class="s21">&nbsp;</p>
        <p class="s21"><strong><span class="s22">Adaptabilidad</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s23">Las personas con esta habilidad tienen la capacidad de permanecer enfocados a sus metas mientras que siguen manejando muchas situaciones. La incertidumbre es un factor esperado y c&oacute;modo. Son flexibles a los nuevos desaf&iacute;os y se apresuran a adaptarse a los cambios repentinos.</span></p>
        <p class="s21">&nbsp;</p>
        <h3 class="s25"><span class="s24">3- </span><span class="s14">Utilizar el potencial existente</span></h3>
        <p><strong><span class="s2">Potencial Humano</span></strong></p>
        <p class="s21" style="text-align: justify;">Son las capacidades y fortalezas interiores de las personas para crecer y progresar. Se pueden desarrollar a lo largo de toda la vida.</p>
        <p class="s21" style="text-align: justify;">El desarrollo real Implica lo que las personas han conseguido, aprender y realizar por sus propios medios, solo y sin ayuda de otros. Este nivel de desarrollo es compatible con las descripciones del desarrollo cognitivo.</p>
        <p class="s21" style="text-align: justify;">El POTENCIAL no es fijo sino ampliable y no es homog&eacute;neo pues incluye capacidades diversas hasta contrapuestas.</p>
        <p>&nbsp;</p>
        <p><strong><span class="s2">&ldquo;Realizaci&oacute;n del POTENCIAL HUMANO&rdquo;</span></strong></p>
        <p class="s21" style="text-align: justify;">Implica lo que puede hacer con la ayuda de los dem&aacute;s, sean &eacute;stos adultos significativos (padres o maestros) o pares m&aacute;s capaces (compa&ntilde;eros, hermanos, amigos).</p>
        <p class="s21" style="text-align: justify;">Pasando de una Zona de desarrollo real (habilidades actuales como estudiante), hacia la Zona de Desarrollo Pr&oacute;ximo (Proceso de formaci&oacute;n, aprendizaje guiado y conocimiento socialmente compartido), y alcanzar la Zona de Desarrollo del Potencial (nivel de lo que se puede alcanzar con el apoyo de otros)</p>
        <p>&nbsp;</p>
        <p><strong><span class="s2">Bienestar</span></strong></p>
        <p class="s21" style="text-align: justify;">Se entiende el bienestar humano como un constructo multidimensional que consiste en juicios de satisfacci&oacute;n sobre los diferentes dominios o esferas de la vida de las personas. Est&aacute; relacionado con la satisfacci&oacute;n laboral y de vida en general.</p>
        <p class="s21" style="text-align: justify;">La relaci&oacute;n entre el potencial humano y el bienestar en el &aacute;mbito laboral es la &nbsp;autodeterminaci&oacute;n, que postula tres necesidades psicol&oacute;gicas: competencia, autonom&iacute;a y pertenencia.</p>
        <p>&nbsp;</p>
        
        <h3 class="s28"><span class="s26">4 </span><span class="s27">- </span><span class="s27">Ponerse en el lugar de los dem&aacute;s</span></h3>
        <p><strong><span class="s2">Empat&iacute;a</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Aquellos que poseen esta capacidad son capaces de comprender las emociones no expresadas de un individuo o un grupo.</span></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Escuchan bien y comprenden f&aacute;cilmente las perspectivas de los dem&aacute;s. Trabajan bien con personas de diferentes culturas y or&iacute;genes.</span></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Comunican asertivamente. Es un elemento clave que nos facilita las interacciones en el lugar de trabajo indicado.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Empat&iacute;a en el trabajo.</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Permite entender a las y los compa&ntilde;eros, d&aacute;ndoles el apoyo necesario para poder avanzar, lo que fortalece la relaciones para mejorar la productividad.</span></p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Falta de empat&iacute;a.</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Puede inferir en la relaciones de trabajo, saber manejarla es muy importante en el ambiente laboral, permite el desarrollo de lazos m&aacute;s fuertes en la empresa.</span></p>
        <p>&nbsp;</p>
        <h3 class="s32"><span class="s31">5- </span><span class="s14">Crear relaciones sociales</span></h3>
        <p><strong><span class="s30">Conciencia Organizacional</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Son personas que entienden todos los aspectos de una organizaci&oacute;n: donde se sostiene el poder formal e informal, relaciones que proporcionan oportunidades para establecer contactos, conflictos, normas t&aacute;citas y valores.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Influencia</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Se trata de aquellas personas que son expertas en atraer a otras y desarrollar su colaboraci&oacute;n. Son persuasivos y atractivos para los individuos y los grupos.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Mentor&iacute;a</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Conocen a las personas con las que trabajan, incluidas sus fortalezas, debilidades y objetivos. Proporcionan comentarios constructivos a su entorno (trabajo, amigos y familiares) y ayudan a otros a centrarse en las oportunidades de crecimiento.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Manejo de conflictos</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Se centran en ayudar a todos a encontrar el terreno com&uacute;n sobre el que pueden estar de acuerdo. Permiten la opini&oacute;n de todos y realizan esfuerzos para encontrar una resoluci&oacute;n buena para todos.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Liderazgo de inspiraci&oacute;n</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Un l&iacute;der que inspira puede mover a la gente. Su gesti&oacute;n ante un objetivo compartido hace que otros se unan a ellos. Muestran a los dem&aacute;s el prop&oacute;sito que hay detr&aacute;s de su trabajo cotidiano.</span></p>
        <p>&nbsp;</p>
        <p><strong><span class="s30">Trabajo en equipo</span></strong></p>
        <p class="s21" style="text-align: justify;"><span class="s29">Son personas que construyen una atm&oacute;sfera de cooperaci&oacute;n, ayuda y respeto. Motivan a otros a comprometerse con el esfuerzo del grupo y contribuyen a desarrollar una identidad, relaciones positivas y esp&iacute;ritu de equipo.</span></p>
        <p>&nbsp;</p>`
      };

      const tagsStyles = {
        body: {
          whiteSpace: 'normal',
          //color: 'gray'
        },
        p: {
            fontSize: '15px',
        },
        h3: {
            fontSize: '20px',
        }
      };
      

    return (
        <SafeAreaView style = { styles.container }>

            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado ]} >
                {/* <Image style = { styles.tituloImg } source = {require('../Componentes/img/factory128-val.png')} /> */}
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto ]}>Salud Mental </Text>
            </View>
            <View style = {[ styles.seccionCuerpo, styles.seccionCuerpoWBorder ]} >
            
                <ScrollView showsVerticalScrollIndicator={false}  style = {{ marginBottom: 10 }} >
                    <Text style = { styles.subtituloTexto } > Competencias socioemocionales </Text>
                    <Image style = { stylesSaludMentalCard.botonImg } source = {require('../Componentes/img/SaludMetalImg.png')} />
                   
                        <RenderHtml
                            contentWidth={0.1}
                            source={source}
                            enableExperimentalMarginCollapsing={true}
                            tagsStyles={tagsStyles}
                        />
           
                </ScrollView>
                
            </View>

        </SafeAreaView>
       
    )


}

const stylesSaludMentalCard = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        marginBottom:10,
        
    },

    buttonBig: {
        width: 150,
        height: 150,
        alignItems:'center',
        marginVertical: 10,
        marginHorizontal: 10
    },

    botonImg: {
        borderRadius: 100,
        alignSelf: 'center',
    },

    description: {
        textAlign:'center',
        color:'#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },

});


export default SaludMental;