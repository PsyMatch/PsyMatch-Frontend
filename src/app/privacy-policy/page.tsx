'use client';

import React from 'react';
import { 
    Shield, 
    Eye, 
    Database, 
    Lock, 
    Users, 
    FileText, 
    AlertTriangle, 
    Mail, 
    Globe,
    UserCheck,
    Settings,
    Calendar
} from 'lucide-react';

const PrivacyPolicyPage = () => {
    const secciones = [
        {
            id: 'introduccion',
            titulo: 'Introducción',
            icono: <Shield className="w-6 h-6" />,
            contenido: [
                'En PsyMatch, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tu información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información cuando utilizas nuestra plataforma.',
                'Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Si no estás de acuerdo con algún aspecto de esta política, te recomendamos que no utilices nuestros servicios.',
                'Esta política se aplica a todos los usuarios de PsyMatch, incluyendo pacientes, psicólogos profesionales y administradores.'
            ]
        },
        {
            id: 'informacion-recopilada',
            titulo: 'Información que Recopilamos',
            icono: <Database className="w-6 h-6" />,
            contenido: [
                'Recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:',
                '• Información de registro: Nombre, apellidos, correo electrónico, fecha de nacimiento, género, país de residencia',
                '• Información de perfil: Fotografía de perfil, biografía, especialidades (para profesionales), preferencias terapéuticas',
                '• Información de sesiones: Fechas y horarios de citas, notas de sesión (solo accesibles por el profesional correspondiente)',
                '• Información de pago: Detalles de facturación y transacciones (procesados de forma segura por terceros)',
                '• Información técnica: Dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia',
                '• Comunicaciones: Mensajes enviados a través de nuestra plataforma, comentarios y evaluaciones'
            ]
        },
        {
            id: 'uso-informacion',
            titulo: 'Cómo Utilizamos tu Información',
            icono: <Settings className="w-6 h-6" />,
            contenido: [
                'Utilizamos tu información personal para los siguientes propósitos:',
                '• Facilitar la conexión entre pacientes y profesionales de salud mental',
                '• Procesar y gestionar citas y sesiones terapéuticas',
                '• Verificar la identidad y credenciales de los profesionales',
                '• Procesar pagos y facturación de servicios',
                '• Enviar notificaciones importantes sobre tu cuenta y servicios',
                '• Mejorar la calidad y funcionalidad de nuestra plataforma',
                '• Proporcionar soporte técnico y atención al cliente',
                '• Cumplir con obligaciones legales y regulatorias',
                '• Prevenir fraudes y garantizar la seguridad de la plataforma'
            ]
        },
        {
            id: 'compartir-informacion',
            titulo: 'Compartir Información',
            icono: <Users className="w-6 h-6" />,
            contenido: [
                'No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes circunstancias:',
                '• Con profesionales: Tu información básica es visible para los psicólogos cuando programas una sesión',
                '• Proveedores de servicios: Compartimos información limitada con proveedores que nos ayudan a operar la plataforma (hosting, pagos, análisis)',
                '• Cumplimiento legal: Podemos divulgar información cuando sea requerido por ley o para proteger derechos legales',
                '• Emergencias: En situaciones de riesgo inmediato para la seguridad, podemos compartir información con autoridades competentes',
                '• Consentimiento: Cuando hayas dado tu consentimiento explícito para compartir información específica'
            ]
        },
        {
            id: 'proteccion-datos',
            titulo: 'Protección de Datos',
            icono: <Lock className="w-6 h-6" />,
            contenido: [
                'Implementamos múltiples capas de seguridad para proteger tu información:',
                '• Encriptación: Toda la información sensible está encriptada tanto en tránsito como en reposo',
                '• Acceso limitado: Solo el personal autorizado tiene acceso a tu información personal',
                '• Autenticación segura: Utilizamos sistemas de autenticación robustos y verificación en dos pasos',
                '• Monitoreo continuo: Supervisamos constantemente nuestra infraestructura para detectar amenazas',
                '• Copias de seguridad: Realizamos copias de seguridad regulares y seguras de todos los datos',
                '• Actualizaciones de seguridad: Mantenemos todos nuestros sistemas actualizados con los últimos parches de seguridad'
            ]
        },
        {
            id: 'confidencialidad-medica',
            titulo: 'Confidencialidad Médica',
            icono: <UserCheck className="w-6 h-6" />,
            contenido: [
                'Reconocemos la naturaleza sensible de la información de salud mental y aplicamos estándares especiales:',
                '• Las conversaciones y sesiones entre pacientes y profesionales están protegidas por confidencialidad médica',
                '• Los profesionales tienen acceso únicamente a la información de sus propios pacientes',
                '• Las notas de sesión y registros médicos son almacenados de forma segura y separada',
                '• Cumplimos con todas las regulaciones locales e internacionales sobre privacidad médica',
                '• Los administradores de la plataforma no tienen acceso a contenido clínico específico'
            ]
        },
        {
            id: 'derechos-usuario',
            titulo: 'Tus Derechos de Privacidad',
            icono: <Eye className="w-6 h-6" />,
            contenido: [
                'Como usuario de PsyMatch, tienes los siguientes derechos sobre tu información personal:',
                '• Acceso: Puedes solicitar una copia de toda la información personal que tenemos sobre ti',
                '• Rectificación: Puedes corregir información inexacta o incompleta en cualquier momento',
                '• Eliminación: Puedes solicitar la eliminación de tu cuenta y datos personales',
                '• Portabilidad: Puedes solicitar que transfiramos tus datos a otro servicio',
                '• Restricción: Puedes limitar cómo procesamos tu información en ciertas circunstancias',
                '• Oposición: Puedes oponerte al procesamiento de tu información para ciertos propósitos',
                'Para ejercer cualquiera de estos derechos, contáctanos a través de privacy@psymatch.com'
            ]
        },
        {
            id: 'cookies-tracking',
            titulo: 'Cookies y Tecnologías de Seguimiento',
            icono: <Globe className="w-6 h-6" />,
            contenido: [
                'Utilizamos cookies y tecnologías similares para mejorar tu experiencia:',
                '• Cookies esenciales: Necesarias para el funcionamiento básico de la plataforma',
                '• Cookies de preferencias: Recuerdan tus configuraciones y preferencias',
                '• Cookies analíticas: Nos ayudan a entender cómo los usuarios interactúan con nuestra plataforma',
                '• Cookies de marketing: Utilizadas para mostrar contenido relevante (solo con tu consentimiento)',
                'Puedes gestionar tus preferencias de cookies en la configuración de tu navegador o a través de nuestro centro de preferencias.'
            ]
        },
        {
            id: 'menores-edad',
            titulo: 'Protección de Menores',
            icono: <AlertTriangle className="w-6 h-6" />,
            contenido: [
                'La protección de menores es una prioridad fundamental:',
                '• Nuestra plataforma está diseñada para usuarios mayores de 18 años',
                '• Los menores de edad requieren consentimiento parental explícito para utilizar nuestros servicios',
                '• Implementamos verificaciones adicionales de edad durante el registro',
                '• Los profesionales que trabajan con menores deben tener certificaciones específicas',
                '• Aplicamos protocolos especiales de confidencialidad y reporte para usuarios menores',
                'Si descubrimos que hemos recopilado información de un menor sin consentimiento, la eliminaremos inmediatamente.'
            ]
        },
        {
            id: 'retencion-datos',
            titulo: 'Retención de Datos',
            icono: <Calendar className="w-6 h-6" />,
            contenido: [
                'Conservamos tu información personal durante los siguientes períodos:',
                '• Información de cuenta: Mientras mantengas una cuenta activa con nosotros',
                '• Registros de sesiones: 7 años después de la última sesión (requisito legal)',
                '• Información de pago: 5 años para cumplir con obligaciones fiscales',
                '• Datos técnicos: 2 años para análisis y mejoras de la plataforma',
                '• Comunicaciones: 3 años para resolución de disputas y soporte',
                'Después de estos períodos, eliminamos o anonimizamos la información de forma segura.'
            ]
        },
        {
            id: 'transferencias-internacionales',
            titulo: 'Transferencias Internacionales',
            icono: <Globe className="w-6 h-6" />,
            contenido: [
                'PsyMatch puede transferir tu información a otros países:',
                '• Utilizamos proveedores de servicios ubicados en diferentes países',
                '• Todas las transferencias cumplen con estándares internacionales de protección de datos',
                '• Implementamos salvaguardas adicionales como cláusulas contractuales estándar',
                '• Tu información está protegida independientemente de dónde se procese',
                '• Puedes solicitar información específica sobre las transferencias de tus datos'
            ]
        },
        {
            id: 'cambios-politica',
            titulo: 'Cambios en esta Política',
            icono: <FileText className="w-6 h-6" />,
            contenido: [
                'Podemos actualizar esta Política de Privacidad ocasionalmente:',
                '• Te notificaremos sobre cambios significativos por correo electrónico',
                '• Los cambios menores se publicarán en nuestra plataforma con 30 días de antelación',
                '• Siempre indicaremos la fecha de la última actualización',
                '• El uso continuado de nuestros servicios constituye aceptación de los cambios',
                '• Puedes revisar el historial de cambios contactando a nuestro equipo'
            ]
        }
    ];

    const contactoPrivacidad = {
        email: 'privacy@psymatch.com',
        telefono: '+1 (555) 123-4567',
        direccion: 'Av. Innovación Tech 123, Ciudad Digital, CD 12345'
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Política de Privacidad
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Tu privacidad y la protección de tus datos son fundamentales para nosotros
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg inline-block">
                            <p className="text-sm text-blue-800">
                                <strong>Última actualización:</strong> 25 de agosto de 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Aviso importante */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                    <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                                Información Importante sobre Privacidad
                            </h3>
                            <p className="text-yellow-700">
                                Esta política describe cómo PsyMatch maneja tu información personal y de salud mental. 
                                Es importante que leas y entiendas todos los aspectos antes de utilizar nuestros servicios. 
                                Para consultas específicas sobre privacidad, contáctanos directamente.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secciones de la política */}
                <div className="space-y-8">
                    {secciones.map((seccion, index) => (
                        <div key={seccion.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                        {seccion.icono}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {index + 1}. {seccion.titulo}
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {seccion.contenido.map((parrafo, pIndex) => (
                                        <p key={pIndex} className="text-gray-700 leading-relaxed">
                                            {parrafo}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Información de contacto */}
                <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200">
                    <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Contacto para Asuntos de Privacidad
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Si tienes preguntas sobre esta política o deseas ejercer tus derechos de privacidad, 
                            puedes contactarnos a través de los siguientes medios:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <p className="font-semibold text-gray-900">Email</p>
                                <p className="text-blue-600">{contactoPrivacidad.email}</p>
                            </div>
                            <div>
                                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <p className="font-semibold text-gray-900">Teléfono</p>
                                <p className="text-gray-700">{contactoPrivacidad.telefono}</p>
                            </div>
                            <div>
                                <Globe className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <p className="font-semibold text-gray-900">Dirección</p>
                                <p className="text-gray-700">{contactoPrivacidad.direccion}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enlaces relacionados */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">
                        Documentos relacionados que también te pueden interesar:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="/terms-of-service" 
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Términos de Servicio
                        </a>
                        <a 
                            href="/about" 
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Acerca de Nosotros
                        </a>
                        <a 
                            href="/how-does-it-work" 
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Settings className="w-4 h-4 mr-2" />
                            Cómo Funciona
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
