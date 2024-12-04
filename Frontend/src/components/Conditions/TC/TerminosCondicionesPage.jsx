import React from "react";
import images from "../../../public/img/images";
import "./TerminosCondicionesPage.css";

const TerminosCondicionesPage = () => {
    return (
        <>
            <div className="TerminosCondiciones-container">
                <h1 className="title-politicas">TÉRMINOS Y CONDICIONES</h1>
                 
                <img className="icono-politica" src={images.terminosYcondiciones} alt="icono" />

                <div className="Terminos">
                    <div className="Information">
                        <h3 className="title-information">Actualizado el 3 de noviembre de 2024</h3>
                        Bienvenido a Travel SV. Nos comprometemos a proteger su privacidad y 
                        a manejar sus datos de manera transparente. Esta Política de Privacidad 
                        describe cómo recopilamos, usamos y protegemos su información personal 
                        cuando utiliza nuestra plataforma. Al acceder o utilizar los servicios, 
                        usted acepta los términos de esta política.
                    </div>

                    <h3 className="title">1. ACEPTACIÓN DE LAS CONDICIONES GENERALES DE USO Y ACCESO AL SITIO WEB Y/O APP</h3>
                    El uso de Travel SV está sujeto a estos Términos y Condiciones. Al acceder 
                    o utilizar nuestro sitio web o aplicación, usted confirma que ha leído, 
                    entendido y aceptado estos términos. En caso de no estar de acuerdo con alguno 
                    de estos términos, le solicitamos que no utilice nuestros servicios.

                    <h3 className="title">2. OBJETO DEL SITIO WEB Y APP</h3>
                    El sitio web y aplicación de Travel SV están destinados a proporcionar una 
                    plataforma en línea para reservar actividades turísticas, guías de viaje, 
                    excursiones y otros servicios relacionados. Nuestro objetivo es ofrecer una 
                    experiencia fácil de usar y accesible para que los usuarios puedan planificar 
                    sus viajes y reservas de manera conveniente.

                    <h3 className="title">3. RESERVA EN CIVITATIS Y REGISTRO EN EL SITIO WEB Y/O APP</h3>
                    Para acceder a ciertos servicios, los usuarios deberán crear una cuenta y 
                    proporcionar información veraz y actualizada. La cuenta es personal y no 
                    debe compartirse con terceros. Travel SV no se hace responsable de los problemas 
                    derivados del mal uso de la cuenta.

                    <h3 className="title">4. CONDICIONES ESPECÍFICAS SOBRE LA RESERVA DE ACTIVIDADES, EXCURSIONES Y VISITAS GUIADAS</h3>
                    Las reservas realizadas a través de nuestra plataforma están sujetas a las 
                    políticas de cancelación y reembolso de cada proveedor de servicios. Travel SV 
                    no garantiza la disponibilidad de todos los servicios en todo momento y no se 
                    hace responsable por cambios o cancelaciones hechas por los proveedores.

                    <h3 className="title">5. OPINIONES, COMENTARIOS, COMUNICACIONES Y OTROS CONTENIDOS</h3>
                    Los usuarios pueden publicar opiniones y comentarios sobre su experiencia en 
                    nuestras actividades turísticas, siempre que el contenido no sea ofensivo, 
                    ilegal o engañoso. Nos reservamos el derecho de eliminar cualquier contenido 
                    que infrinja estos términos o que consideremos inapropiado.

                    {/* Términos adicionales ampliados */}
                    <h3 className="title">6. PROPIEDAD INTELECTUAL Y DERECHOS DE AUTOR</h3>
                    Todos los elementos presentes en Travel SV, incluidos pero no limitados a texto, 
                    gráficos, logotipos, iconos, imágenes, audio y software, son propiedad exclusiva de 
                    Travel SV o de sus respectivos licenciantes y están protegidos por leyes 
                    internacionales de propiedad intelectual. Está estrictamente prohibido copiar, 
                    modificar, distribuir o reproducir estos elementos sin el consentimiento previo y 
                    por escrito de Travel SV, salvo en los casos permitidos por la ley. El uso no 
                    autorizado puede resultar en sanciones civiles y penales.

                    <h3 className="title">7. RESPONSABILIDAD DEL USUARIO Y USO ADECUADO</h3>
                    Al acceder y utilizar nuestra plataforma, el usuario se compromete a hacer un 
                    uso adecuado y lícito de los servicios ofrecidos, absteniéndose de emplear los 
                    contenidos de Travel SV para actividades contrarias a la legislación aplicable, a 
                    la moral o al orden público. El usuario es responsable de la veracidad de la 
                    información proporcionada y acepta indemnizar a Travel SV frente a cualquier 
                    reclamación derivada de un uso inapropiado o ilícito de la plataforma o de la 
                    información proporcionada.

                    <h3 className="title">8. LIMITACIÓN DE RESPONSABILIDAD</h3>
                    Travel SV no se responsabiliza por la exactitud, vigencia o disponibilidad continua 
                    de los contenidos y servicios ofrecidos en la plataforma. Aunque trabajamos continuamente 
                    para proporcionar una experiencia de alta calidad, no garantizamos la disponibilidad 
                    continua de nuestros servicios ni la ausencia de errores o interrupciones en la plataforma. 
                    En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes que 
                    puedan surgir del uso de la plataforma.

                    <h3 className="title">9. MODIFICACIONES DE LOS TÉRMINOS Y CONDICIONES</h3>
                    Nos reservamos el derecho, a nuestra absoluta discreción, de modificar, ampliar o actualizar 
                    estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas desde 
                    su publicación en el sitio web, y el uso continuado de la plataforma constituirá la aceptación 
                    de los términos modificados. Recomendamos que los usuarios revisen periódicamente los 
                    Términos y Condiciones para estar al tanto de posibles cambios.

                    <h3 className="title">10. CONTACTO Y SOPORTE</h3>
                    Para consultas, soporte técnico o comentarios sobre estos Términos y Condiciones, los usuarios 
                    pueden contactarnos a través de los medios de comunicación proporcionados en nuestra página de 
                    contacto. Nos comprometemos a brindar asistencia y resolver cualquier duda o inconveniente en el 
                    menor tiempo posible, con el objetivo de ofrecer una experiencia de usuario satisfactoria y transparente.
                </div>
            </div>
        </>
    );
};

export default TerminosCondicionesPage;
