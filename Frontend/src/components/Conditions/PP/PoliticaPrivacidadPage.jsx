import React from "react";
import images from "../../../public/img/images";
import "./PoliticaPrivacidadPage.css";

const PoliticaPrivacidadPage = () => {
    return (
        <>
            <div className="PoliticaPrivacidad-container">
                <h1 className="title-politicas">POLITICA Y PRIVACIDAD</h1>
                 
                <img className="icono-politica" src={images.politicaYprivacidad} alt="icono" />


                <div className="Politicas">
                <div className="Information">
                    <h3 className="title-information">Actualizado el 3 de noviembre de 2024</h3>
                    
                    Bienvenido a Travel SV. Nos comprometemos a proteger su privacidad y 
                    a manejar sus datos de manera transparente. Esta Política de Privacidad 
                    describe cómo recopilamos, usamos y protegemos su información personal 
                    cuando utiliza nuestra plataforma. Al acceder o utilizar los servicios, 
                    usted acepta los términos de esta política.
                    
                </div>

                    <h3 className="title">1. RECOLECCIÓN DE INFORMACIÓN PERSONAL</h3>
                    
                    Recopilamos información personal que usted nos proporciona al crear 
                    una cuenta, realizar una reserva o interactuar con nuestro sitio web 
                    o aplicación. Esto incluye, pero no se limita a, su nombre, dirección 
                    de correo electrónico, número de teléfono y detalles de pago. Esta 
                    información es necesaria para proporcionarle los servicios que ofrece 
                    Travel SV.
                    

                    <h3 className="title">2. USO DE SU INFORMACIÓN</h3>
                    La información que recopilamos se utiliza para:
                       <ul>
                          <li>Procesar sus reservas y gestionar los pagos.</li>
                          <li>Comunicarnos con usted acerca de sus reservas y responder a sus consultas.</li>
                          <li>Enviar información sobre promociones, servicios y actualizaciones relacionadas con Travel SV.</li>
                          <li>Mejorar nuestra plataforma y personalizar su experiencia de usuario.</li>
                      </ul>
                      


                    <h3 className="title">3. COMPARTIR INFORMACIÓN CON TERCEROS</h3>
                    
                    Implementamos medidas de seguridad para proteger su información contra 
                    el acceso no autorizado, alteración, divulgación o destrucción. Utilizamos 
                    tecnología de encriptación y controles de acceso para mantener su información 
                    segura. Sin embargo, no podemos garantizar una seguridad absoluta debido a 
                    la naturaleza de Internet.
                    

                    <h3 className="title">4. SEGURIDAD DE SUS DATOS</h3>
                    
                    Implementamos medidas de seguridad para proteger su información contra el 
                    acceso no autorizado, alteración, divulgación o destrucción. Utilizamos tecnología 
                    de encriptación y controles de acceso para mantener su información segura. Sin embargo, 
                    no podemos garantizar una seguridad absoluta debido a la naturaleza de Internet.
                    

                    <h3 className="title">5. COOKIES Y TECNOLOGÍAS SIMILARES</h3>
                    
                    Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio 
                    web. Las cookies permiten que nuestro sitio recuerde sus preferencias, facilite la navegación a
                    y recopile datos sobre el uso de la plataforma. Usted puede configurar su navegador para 
                    rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
                    

                    <h3 className="title">6. CAMBIOS EN LA POLÍTICA DE PRIVACIDAD</h3>
                    
                    Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento 
                    para reflejar cambios en nuestras prácticas de privacidad. Le recomendamos revisar
                    periódicamente esta página para estar informado sobre cómo protegemos su información.
                    

                    <h3 className="title">7. RETENCIÓN DE INFORMACIÓN</h3>
                    
                    Conservamos su información personal durante el tiempo que sea necesario para cumplir con los fines
                    para los cuales se recopiló, incluidos los requisitos legales, contables o de informes. Cuando ya
                    no necesitemos su información, la eliminaremos de manera segura o la anonimizaremos para que no se
                    pueda utilizar para identificarlo personalmente.
                    

                    <h3 className="title">8. DERECHOS DEL USUARIO</h3>

                    Usted tiene el derecho de acceder, rectificar, cancelar o solicitar la limitación del uso de su
                    información personal. Si desea ejercer alguno de estos derechos, puede contactarnos a través de
                    los medios proporcionados en nuestro sitio. Procesaremos su solicitud en cumplimiento con las
                    leyes aplicables de protección de datos.

                </div>
            </div>
        </>
    );
};

export default PoliticaPrivacidadPage;
