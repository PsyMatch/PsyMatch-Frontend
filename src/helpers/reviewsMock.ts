const reviews = [
    {
        userId: '473b808c-d8ef-44d5-8316-4f31426489d6',
        rating: 5,
        comment:
            '¡Excelente psicólogo! Muy profesional y comprensivo. La sesión fue muy útil y me sentí cómodo durante todo el tiempo. Definitivamente lo recomiendo.',
        review_date: new Date('2024-01-15'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '3bebd121-9d72-4acb-8a1c-b7ec5388de0c',
        rating: 4,
        comment:
            'Muy buena experiencia. El psicólogo es muy empático y me ayudó mucho con mis problemas de ansiedad. Las técnicas que me enseñó han sido muy efectivas.',
        review_date: new Date('2024-01-20'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '39c23699-45ea-471c-a359-39afe3f7984f',
        rating: 5,
        comment:
            'Increíble profesional. Su enfoque cognitivo-conductual me ha cambiado la vida. Altamente recomendado para cualquier persona que busque ayuda profesional.',
        review_date: new Date('2024-02-01'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '2949f113-1e5c-40bf-91cb-28a3b53040d3',
        rating: 4,
        comment:
            'Muy profesional y paciente. Me ayudó a superar momentos difíciles con técnicas muy efectivas. El ambiente de la consulta es muy cómodo y relajante.',
        review_date: new Date('2024-02-10'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '473b808c-d8ef-44d5-8316-4f31426489d6',
        rating: 5,
        comment:
            'Excelente terapeuta especializada en terapia familiar. Nos ayudó mucho como pareja y ahora tenemos herramientas para comunicarnos mejor.',
        review_date: new Date('2024-02-15'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '3bebd121-9d72-4acb-8a1c-b7ec5388de0c',
        rating: 3,
        comment:
            'Buena experiencia en general. El psicólogo es conocedor, aunque a veces siento que las sesiones son un poco cortas. Aún así, me ha ayudado.',
        review_date: new Date('2024-02-20'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '39c23699-45ea-471c-a359-39afe3f7984f',
        rating: 5,
        comment:
            'Fantástica experiencia con terapia EMDR. Me ayudó a procesar traumas pasados de manera muy efectiva. Totalmente recomendado para trauma.',
        review_date: new Date('2024-03-01'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '2949f113-1e5c-40bf-91cb-28a3b53040d3',
        rating: 4,
        comment:
            'Muy buena psicóloga especializada en adolescentes. Mi hija se sintió muy cómoda y ha mostrado mucha mejoría en sus problemas de autoestima.',
        review_date: new Date('2024-03-05'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '473b808c-d8ef-44d5-8316-4f31426489d6',
        rating: 5,
        comment:
            'Excelente profesional en terapia cognitivo-conductual. Sus técnicas para manejar la depresión han sido fundamentales en mi recuperación.',
        review_date: new Date('2024-03-10'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '3bebd121-9d72-4acb-8a1c-b7ec5388de0c',
        rating: 4,
        comment: 'Muy recomendado. Buen manejo de la terapia humanística. Me ayudó a encontrar mi propósito y a desarrollar mayor autoconocimiento.',
        review_date: new Date('2024-03-15'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '39c23699-45ea-471c-a359-39afe3f7984f',
        rating: 5,
        comment: 'Increíble experiencia con terapia de pareja. Nos dio herramientas muy valiosas para mejorar nuestra relación y comunicación.',
        review_date: new Date('2024-03-20'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '2949f113-1e5c-40bf-91cb-28a3b53040d3',
        rating: 4,
        comment: 'Muy profesional y empático. Me ayudó a superar mi fobia social con técnicas de exposición gradual. Muy recomendado.',
        review_date: new Date('2024-03-25'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '473b808c-d8ef-44d5-8316-4f31426489d6',
        rating: 5,
        comment:
            'Excelente terapeuta para niños. Mi hijo de 8 años se siente muy cómoda con ella y ha mejorado mucho su comportamiento en casa y en el colegio.',
        review_date: new Date('2024-04-01'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '3bebd121-9d72-4acb-8a1c-b7ec5388de0c',
        rating: 3,
        comment:
            'Experiencia positiva. El psicólogo es muy preparado académicamente, aunque a veces me gustaría más práctica y menos teoría en las sesiones.',
        review_date: new Date('2024-04-05'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
    {
        userId: '39c23699-45ea-471c-a359-39afe3f7984f',
        rating: 5,
        comment: 'Fantástico profesional. Su enfoque en mindfulness y técnicas de relajación me han ayudado enormemente con mi estrés laboral.',
        review_date: new Date('2024-04-10'),
        psychologistId: 'e005259a-ead6-46ed-86e5-8359b8280474',
    },
];

export default reviews;
