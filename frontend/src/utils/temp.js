export const templateOne = `
<div class="bg-white h-full w-full flex">
        <!-- Left Sidebar -->
        <div class="w-[35%] p-3 text-white" style="background-color: {{mainColor}};">
            <!-- Profile Photo Section -->
            {{#profilePhoto}}
            <div class="flex justify-center mb-6">
                <img src="{{profilePhoto}}" 
                    alt="Profile Photo" 
                    class="w-full h-[180px] rounded-xl object-cover border-4 border-[#9DB4C0]"/>
            </div>
            {{/profilePhoto}}

            <!-- Skills Section -->
            {{#skills.length}}
            <section class="mb-4">
                <div class="flex items-center gap-2">
                    <h2>SKILLS</h2>
                </div>
                <div>
                    {{#skills}}
                        <p>
                        <small>{{skill}}</small>
                        </p>
                    {{/skills}}
                </div>
            </section>
            {{/skills.length}}

            <!-- Education Section -->
            {{#education.length}}
            <section class="mb-3">
                <div class="flex items-center gap-2 mb-2">
                    <h2>EDUCATION</h2>
                </div>
                
                {{#education}}
                <div class="mb-4">
                    <h3>{{degree}}</h3>
                    <p>{{institution}}</p>
                    <small>{{startDate}} - {{endDate}}</small>
                </div>
                {{/education}}
            </section>
            {{/education.length}}

            <!-- Languages Section -->
            {{#languages.length}}
            <section class="mb-8">
                <div class="flex items-center gap-2 mb-2">
                    <h2>LANGUAGES</h2>
                </div>

                {{#languages}}
                <div class="mb-2">
                    <p>{{language}} - <small>{{proficiency}}</small></p>
                </div>
                {{/languages}}
            </section>
            {{/languages.length}}

            <!-- Interests Section -->
            {{#interests.length}}
            <section>
                <div class="flex items-center gap-2 mb-2">
                    <h2>INTERESTS</h2>
                </div>
                <div>
                    {{#interests}}
                    <div class="flex items-center gap-2">
                        <p>{{.}}</p>
                    </div>
                    {{/interests}}
                </div>
            </section>
            {{/interests.length}}
        </div>

        <!-- Right Content Area -->
        <div class="w-[65%] p-3">
            <!-- Header Section -->
            <header class="mb-6">
                <h1 class="text-[32px] font-bold" style="color: {{mainColor}};">{{firstName}} {{lastName}}</h1>
                <h2 class="text-[20px] mb-3" style="color: {{mainColor}};">{{jobTitle}}</h2>
                
                <!-- Contact Info -->
                <div class="flex flex-wrap gap-2 text-[14px] text-[#2D3142]">
                    {{#email}}
                    <div class="flex items-center">
                        <p>{{email}}</p>
                    </div>
                    {{/email}}

                    {{#phone}}
                    <div class="flex items-center">
                        <p>{{phone}}</p>
                    </div>
                    {{/phone}}

                    {{#city}}
                    <div class="flex items-center gap-2">
                        <p>{{city}}</p>
                    </div>
                    {{/city}}
                </div>
            </header>

            <div class="w-full h-[1px] bg-[{{mainColor}}] mb-4"></div>

            <!-- Work Experience Section -->
            {{#experience.length}}
            <section class="mb-4">
                <div class="flex items-center gap-2">
                    <h2 style="color: {{mainColor}};">WORK EXPERIENCE</h2>
                </div>
                
                {{#experience}}
                <article class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3>{{role}}</h3>
                            <p>{{companyName}}</p>
                        </div>

                        <div class="text-right">
                            <p>{{startDate}} - {{endDate}}</p>
                            {{#location}}
                                <p>{{location}}</p>
                            {{/location}}
                        </div>
                    </div>
                    
                    {{#achievements.length}}
                    <div class="mt-2">
                        <p>Achievements</p>
                        <ul class="list-disc pl-5 space-y-1">
                            {{#achievements}}
                                <li><p>{{.}}</p></li>
                            {{/achievements}}
                        </ul>
                    </div>
                    {{/achievements.length}}
                </article>
                {{/experience}}
            </section>
            {{/experience.length}}

            {{#summary}}
            <section class="mb-4">
                <div class="flex items-center gap-2">
                    <h2 style="color: {{mainColor}};">SUMMARY</h2>
                </div>
                <p>{{.}}</p>
            </section>
            {{/summary}}

            <!-- Conferences & Courses Section -->
            {{#certifications.length}}
            <section class="mb-4">
                <div class="flex items-center gap-2">
                    <h2 style="color: {{mainColor}};">COURSES</h2>
                </div>
                
                <div class="space-y-3">
                    {{#certifications}}
                    <div>
                        <h3>{{title}} 
                            {{#credentialURL}}<a href="{{credentialURL}}" target=”_blank”  class="text-[#5C9998] ml-1">↗</a>{{/credentialURL}}
                        </h3>
                        <p>{{issuingOrganization}}</p>
                    </div>
                    {{/certifications}}
                </div>
            </section>
            {{/certifications.length}}

            <!-- Refrences Section -->
            {{#references.length}}
            <section class="mb-4">
                <div class="flex items-center gap-2">
                    <h2 style="color: {{mainColor}};">REFRENCES</h2>
                </div>
                
                <div class="space-y-3">
                    {{#references}}
                    <div>
                        <h3>{{name}}</h3>
                        <p>{{relation}}</p>
                        <p>{{email}} 
                        {{#phone}}
                        || {{phone}}
                        {{/phone}}
                        </p>
                    </div>
                    {{/references}}
                </div>
            </section>
            {{/references.length}}
        </div>
    </div>
`;

export const templateTwo = `
    <div class="bg-white h-full w-full flex flex-col p-4">
        <header class="w-full flex flex-col justify-center items-center mb-6">
            <h1 style="font-size: 20px; color: {{mainColor}};">{{firstName}} {{lastName}}</h1>
            <h2 style="font-size: 14px; color: {{mainColor}};">{{jobTitle}}</h2>

            <div class="flex flex-wrap gap-3 text-[{{mainColor}}] mt-2">
                    {{#city}}
                        <div class="flex items-center gap-1">
                            <span class="">📍</span>
                            <h2 style="font-weight: normal;">{{city}}</h3>
                        </div>
                    {{/city}}

                    {{#email}}
                        <div class="flex items-center gap-1">
                            <span class="">✉️</span>
                            <h2 style="font-weight: normal;">{{email}}</h2>
                        </div>
                    {{/email}}

                    {{#phone}}
                        <div class="flex items-center gap-1">
                            <span class="">📞</span>
                            <h2 style="font-weight: normal;">{{phone}}</h2>
                        </div>
                    {{/phone}}
                </div>
        </header>

        <div class="flex flex-col gap-4">
            {{#summary}}
                <section>
                    <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">SUMMARY</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                    </div>
                    <p class="text-start mx-2">{{.}}</p>
                </section>
            {{/summary}}

            {{#skills.length}}
                <section>
                    <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">SKILLS</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                    </div>
                    <div>
                        <div class="flex flex-wrap gap-1 mx-2">
                        {{#skills}}
                            <p class="bg-gray-100 px-[3px] py-[2px] rounded">{{skill}}</p>
                        {{/skills}}
                    </div>
                    </div>
                </section>
            {{/skills.length}}

            {{#experience.length}}
                <section>
                    <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">WORK EXPERIENCE</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                    </div>
                    
                    {{#experience}}
                    <div class="mx-2">
                        <div class="flex flex-col justify-between items-start">
                            <div class="flex w-full justify-between items-end">
                                <div class="flex">
                                    <h3>{{companyName}}</h3>
                                    {{#location}}
                                        <p>, {{location}}</p>
                                    {{/location}}
                                </div>
                                <p>{{startDate}} - {{endDate}}</p>
                            </div>

                            <div class="w-full flex flex-col">
                                <h4 class="italic font-normal">{{role}}</h4>
                                <p>{{description}}</p>
                            </div>
                        </div>
                    </div>
                    {{/experience}}
                </section>  
            {{/experience.length}}

            {{#education.length}}
            <section>
                <div class="flex justify-center items-center gap-2">
                    <h2 style="color: {{mainColor}};">EDUCATION</h2>
                    <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                {{#education}}
                    <div class="flex flex-col justify-between items-start mx-2">
                        <div class="flex w-full justify-between items-end">
                            <div class="flex">
                                <h3>{{degree}}</h3>
                                {{#institution}}
                                    <p>, {{institution}}</p>
                                {{/institution}}
                                
                                {{#city}}
                                    <p>, {{city}}</p>
                                {{/city}}
                            </div>
                            <p>{{startDate}} - {{endDate}}</p>
                        </div>

                        <div class="w-full flex flex-col">
                            <h4 class="italic font-normal">{{role}}</h4>
                            <p>{{description}}</p>
                        </div>
                    </div>
                {{/education}}
            </section>
            {{/education.length}}

            {{#interests.length}}
            <section>
                <div class="flex justify-center items-center gap-2">
                    <h2 style="color: {{mainColor}};">INTEREST</h2>
                    <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                <div class="flex flex-col justify-between items-start mx-2">
                    {{#interests}}
                        <div class="flex items-center gap-2">
                            <p>{{.}}</p>
                        </div>
                    {{/interests}}
                </div>
            </section>
            {{/interests.length}}

            {{#certifications.length}}
                <section>
                    <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">COURSES</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                    </div>

                    {{#certifications}}
                    <div class="mx-2">
                            <div class="flex w-full justify-between items-end">
                                <div class="flex">
                                     <h3>{{title}} 
                                        {{#credentialURL}}<a href="{{credentialURL}}" target=”_blank”  class="text-[#5C9998] ml-1">↗</a>{{/credentialURL}}
                                    </h3>
                                </div>
                                <p>{{issuingOrganization}}</p>
                            </div>
                    </div>
                    {{/certifications}}
                </section>
            {{/certifications.length}}

            {{#references.length}}
                <section>
                    <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">REFRENCES</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                    </div>
                    
                    {{#references}}
                        <div class="mx-2 flex justify-between items-start">
                            <h3>{{name}}</h3>
                            <p>{{relation}}</p>
                            <p>{{email}} 
                            {{#phone}}
                            || {{phone}}
                            {{/phone}}
                            </p>
                        </div>
                    {{/references}}
                </section>
            {{/references.length}}

            {{#languages.length}}
            <section>
                <div class="flex justify-center items-center gap-2">
                        <h2 style="color: {{mainColor}};">LANGUAGES</h2>
                        <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>

                {{#languages}}
                <div class="mx-2 flex justify-between items-start">
                    <p>{{language}} - <small>{{proficiency}}</small></p>
                </div>
                {{/languages}}
            </section>
            {{/languages.length}}
        </div>
    </div>
`;

export const templateFive = `
<div class="bg-white h-full w-full flex">

    <!-- Left Sidebar -->
    <div class="w-[35%] p-2 text-white" style="background-color: {{mainColor}};">
        <!-- Profile Photo Section -->
        {{#profilePhoto}}
        <div class="w-full flex justify-center mb-3">
            <img src="{{profilePhoto}}" 
                 alt="Profile Photo" 
                 class="w-fulll h-[180px] rounded-sm object-cover border-4 border-[#9DB4C0]"/>
        </div>
        {{/profilePhoto}}

        <!-- Skills Section -->
        {{#skills.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-1">
                <span class="">⚡</span>
                <h2 class="font-bold">SKILLS</h2>
            </div>
            <div class="space-y-1">
                {{#skills}}
                    <p>{{skill}}</p>
                {{/skills}}
            </div>
        </section>
        {{/skills.length}}

        <!-- Education Section -->
        {{#education.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">🎓</span>
                <h2 class=" font-bold">EDUCATION</h2>
            </div>
            
            {{#education}}
            <div class="mb-2">
                <h3 class="font-bold">{{degree}}</h3>
                <p class="">{{institution}}</p>
                <small class="text-white">{{startDate}} - {{endDate}}</small>
            </div>
            {{/education}}
        </section>
        {{/education.length}}

        <!-- Interests Section -->
        {{#interests.length}}
        <section>
            <div class="flex items-center gap-2 mb-2">
                <span class="">🎯</span>
                <h2 class=" font-bold">INTERESTS</h2>
            </div>
            <div class="space-y-1">
                {{#interests}}
                <div class="flex gap-2">
                    <p class="">{{.}}</p>
                </div>
                {{/interests}}
            </div>
        </section>
        {{/interests.length}}
    </div>

    <!-- Right Content Area -->
    <div class="w-[65%] p-4">
        <!-- Header Section -->
        <header class="mb-4">
            <h1 class="font-bold" style="color: {{mainColor}};">{{firstName}} {{lastName}}</h1>
            <p class="mb-2" style="color: {{mainColor}};">{{jobTitle}}</p>
            
            <!-- Contact Info -->
            <div class="flex flex-wrap gap-4 text-[#2D3142]">
                {{#email}}
                <div class="flex items-center gap-1">
                    <span>📧</span>
                    <p>{{email}}</p>
                </div>
                {{/email}}
                {{#phone}}
                <div class="flex items-center gap-1">
                    <span>📱</span>
                    <p>{{phone}}</p>
                </div>
                {{/phone}}
                {{#city}}
                <div class="flex items-center gap-1">
                    <span>📍</span>
                    <p>{{city}}</p>
                </div>
                {{/city}}
            </div>
        </header>

        <!-- Work Experience Section -->
        {{#experience.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">💼</span>
                <h2 class="font-bold" style="color: {{mainColor}};">WORK EXPERIENCE</h2>
            </div>
            
            {{#experience}}
                <article class="flex flex-col mb-2">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class=" font-bold text-[#2D3142]">{{role}}</h3>
                            <p class="text-[#5C9998]">{{companyName}}</p>
                        </div>
                        <div class="text-right">
                            <p class=" text-gray-600">{{startDate}} - {{endDate}}</p>
                            {{#location}}<p class=" text-gray-600">{{location}}</p>{{/location}}
                        </div>
                    </div>

                    <p>{{description}}</p>
                </article>
            {{/experience}}
        </section>
        {{/experience.length}}

        {{#summary}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">📄</span>
                <h2 class=" font-bold" style="color: {{mainColor}};">SUMMARY</h2>
            </div>
            <p class="text-gray-600 italic">{{.}}</p>
        </section>
        {{/summary}}

        <!-- Conferences & Courses Section -->
        {{#certifications.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">🎯</span>
                <h2 class="font-bold" style="color: {{mainColor}};">COURSES</h2>
            </div>
            
            <div class="space-y-3">
                {{#certifications}}
                <div class="flex justify-between items-center">
                    <h3 class="font-semibold text-[#2D3142]">{{title}} 
                        {{#credentialURL}}<a href="{{credentialURL}}" target=”_blank”  class="text-[#5C9998] ml-1">↗</a>{{/credentialURL}}
                    </h3>
                    <p class=" text-gray-600 italic">{{issuingOrganization}}</p>
                </div>
                {{/certifications}}
            </div>
        </section>
        {{/certifications.length}}

        <!-- Refrences Section -->
        {{#references.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">👥</span>
                <h2 class="font-bold" style="color: {{mainColor}};">REFRENCES</h2>
            </div>
            
            <div class="space-y-3">
                {{#references}}
                <div>
                    <h3 class="font-semibold text-[#2D3142]">{{name}}</h3>
                    <p class=" text-gray-600 italic">{{relation}}</p>
                    <p class=" text-gray-600 italic">{{email}} 
                    {{#phone}}
                    || {{phone}}
                    {{/phone}}
                    </p>
                </div>
                {{/references}}
            </div>
        </section>
        {{/references.length}}

        <!-- Languages Section -->
        {{#languages.length}}
        <section class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="">🌐</span>
                <h2 class=" font-bold" style="color: {{mainColor}};">LANGUAGES</h2>
            </div>

            {{#languages}}
            <div class="w-full flex justify-start items-center mb-1 text-center">
                <h3>{{language}}</h3>
                <small class="italic text-black flex items-center text-center">- {{proficiency}}</small>
            </div>
            {{/languages}}
        </section>
        {{/languages.length}}
    </div>
</div>
`;

export const templateFour = `
<div class="bg-white h-full w-full flex flex-col p-4">
    <!-- Header Section (existing) -->
    <div class="w-full flex items-start gap-4">
        <div class="flex flex-col flex-1">
            <h1 class="text-[28px] uppercase tracking-wider">{{firstName}} {{lastName}}</h1>
            <p class="text-[18px] mb-1" style="color: {{mainColor}};">{{jobTitle}}</p>
            {{#email}}
                <p class="text-[14px] mb-3">{{email}}</p>
            {{/email}}
        </div>

        {{#profilePhoto}}
            <div class="flex-shrink-0">
                <img src="{{profilePhoto}}" 
                    alt="Profile Photo" 
                    class="w-[120px] h-[120px] rounded-full object-cover border-4 border-white"/>
            </div>
        {{/profilePhoto}}
    </div>

    <!-- Main Content -->
    <div class="w-full flex gap-6">
        <!-- Left Column -->
        <div class="w-[60%] space-y-6">
            {{#summary}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">SUMMARY</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                <p class="text-start my-2">{{.}}</p>
            </section>
            {{/summary}}

            <!-- Work Experience Section -->
            {{#experience.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">WORK EXPERIENCE</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                {{#experience}}
                <article class="my-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-semibold">{{role}}</h3>
                            <p class="text-gray-600">{{companyName}}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-gray-600">{{startDate}} - {{endDate}}</p>
                            {{#location}}<p class="text-gray-600">{{location}}</p>{{/location}}
                        </div>
                    </div>
                    <p class="mt-2">{{description}}</p>
                </article>
                {{/experience}}
            </section>
            {{/experience.length}}

            <!-- Certifications Section -->
            {{#certifications.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">CERTIFICATIONS</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                <div class="space-y-3 my-2">
                    {{#certifications}}
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold">{{title}} 
                            {{#credentialURL}}<a href="{{credentialURL}}" target="_blank" class="text-blue-600 ml-1">↗</a>{{/credentialURL}}
                        </h3>
                        <p class="text-gray-600">{{issuingOrganization}}</p>
                    </div>
                    {{/certifications}}
                </div>
            </section>
            {{/certifications.length}}
        </div>

        <!-- Right Column -->
        <div class="w-[40%] space-y-6">
            <!-- Skills Section -->
            {{#skills.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">SKILLS</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                <div class="flex flex-wrap gap-2 my-2">
                    {{#skills}}
                        <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">{{skill}}</span>
                    {{/skills}}
                </div>
            </section>
            {{/skills.length}}

            <!-- Education Section -->
            {{#education.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">EDUCATION</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                {{#education}}
                <div class="my-2">
                    <h3 class="font-semibold">{{degree}}</h3>
                    <p>{{institution}}</p>
                    <p class="text-gray-600">{{startDate}} - {{endDate}}</p>
                </div>
                {{/education}}
            </section>
            {{/education.length}}

            <!-- Languages Section -->
            {{#languages.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">LANGUAGES</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                {{#languages}}
                <div class="flex justify-between items-center my-2">
                    <span>{{language}}</span>
                    <span class="text-gray-600">{{proficiency}}</span>
                </div>
                {{/languages}}
            </section>
            {{/languages.length}}

            <!-- Interests Section -->
            {{#interests.length}}
            <section>
                <div class="flex flex-col justify-start items-start">
                    <h2 style="color: {{mainColor}};">INTERESTS</h2>
                    <div class="w-full h-[1px]" style="background-color: {{mainColor}}"></div>
                </div>
                
                <div class="flex flex-wrap gap-2 my-2">
                    {{#interests}}
                        <span class="text-gray-600">{{.}}</span>
                    {{/interests}}
                </div>
            </section>
            {{/interests.length}}
        </div>
    </div>
</div>
`;

export const templateThree = `
<div class="bg-white h-full w-full flex flex-col p-4">
    <!-- Header Section -->
    <header class="w-full flex flex-col justify-center items-center mb-6">
        <div class="flex items-center gap-4 mb-3">
            {{#profilePhoto}}
            <div class="flex-shrink-0">
                <img src="{{profilePhoto}}" 
                     alt="Profile Photo" 
                     class="w-[100px] h-[100px] rounded-full object-cover border-4" 
                     style="border-color: {{mainColor}};"/>
            </div>
            {{/profilePhoto}}
            
            <div class="flex flex-col items-center">
                <h1 style="font-size: 20px; color: {{mainColor}};">{{firstName}} {{lastName}}</h1>
                <h2 style="font-size: 14px; color: {{mainColor}};">{{jobTitle}}</h2>
            </div>
        </div>

        <div class="flex flex-wrap gap-3 justify-center items-center mt-2">
            {{#email}}
            <div class="flex items-center gap-1">
                <span>📧</span>
                <h2 style="font-weight: normal;">{{email}}</h2>
            </div>
            {{/email}}
            {{#phone}}
            <div class="flex items-center gap-1">
                <span>📱</span>
                <h2 style="font-weight: normal;">{{phone}}</h2>
            </div>
            {{/phone}}
            {{#city}}
            <div class="flex items-center gap-1">
                <span>📍</span>
                <h2 style="font-weight: normal;">{{city}}</h2>
            </div>
            {{/city}}
        </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-col gap-4">
        <!-- Summary Section -->
        {{#summary}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">SUMMARY</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            <p class="text-start mx-2">{{.}}</p>
        </section>
        {{/summary}}

        <!-- Skills Section -->
        {{#skills.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">SKILLS</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            <div class="flex flex-wrap gap-1 mx-2">
                {{#skills}}
                <p class="bg-gray-100 px-[3px] py-[2px] rounded">{{skill}}</p>
                {{/skills}}
            </div>
        </section>
        {{/skills.length}}

        <!-- Experience Section -->
        {{#experience.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">WORK EXPERIENCE</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            
            {{#experience}}
            <div class="mx-2">
                <div class="flex flex-col justify-between items-start">
                    <div class="flex w-full justify-between items-end">
                        <div class="flex">
                            <h3>{{companyName}}</h3>
                            {{#location}}<p>, {{location}}</p>{{/location}}
                        </div>
                        <p>{{startDate}} - {{endDate}}</p>
                    </div>
                    <div class="w-full flex flex-col">
                        <h4 class="italic font-normal">{{role}}</h4>
                        {{#achievements.length}}
                        <ul class="list-disc pl-5 space-y-1">
                            {{#achievements}}
                            <li>{{.}}</li>
                            {{/achievements}}
                        </ul>
                        {{/achievements.length}}
                    </div>
                </div>
            </div>
            {{/experience}}
        </section>
        {{/experience.length}}

        <!-- Education Section -->
        {{#education.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">EDUCATION</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            
            {{#education}}
            <div class="mx-2">
                <div class="flex w-full justify-between items-end">
                    <div class="flex">
                        <h3>{{degree}}</h3>
                        {{#institution}}<p>, {{institution}}</p>{{/institution}}
                        {{#city}}<p>, {{city}}</p>{{/city}}
                    </div>
                    <p>{{startDate}} - {{endDate}}</p>
                </div>
            </div>
            {{/education}}
        </section>
        {{/education.length}}

        <!-- Certifications Section -->
        {{#certifications.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">COURSES</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            
            {{#certifications}}
            <div class="mx-2">
                <div class="flex w-full justify-between items-end">
                    <h3>{{title}} 
                        {{#credentialURL}}<a href="{{credentialURL}}" target="_blank" class="text-[#5C9998] ml-1">↗</a>{{/credentialURL}}
                    </h3>
                    <p>{{issuingOrganization}}</p>
                </div>
            </div>
            {{/certifications}}
        </section>
        {{/certifications.length}}

        <!-- Languages Section -->
        {{#languages.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">LANGUAGES</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            
            {{#languages}}
            <div class="mx-2 flex justify-between items-start">
                <p>{{language}} - <small>{{proficiency}}</small></p>
            </div>
            {{/languages}}
        </section>
        {{/languages.length}}

        <!-- References Section -->
        {{#references.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">REFERENCES</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            
            {{#references}}
            <div class="mx-2 flex justify-between items-start">
                <h3>{{name}}</h3>
                <p>{{relation}}</p>
                <p>{{email}} {{#phone}}|| {{phone}}{{/phone}}</p>
            </div>
            {{/references}}
        </section>
        {{/references.length}}

        <!-- Interests Section -->
        {{#interests.length}}
        <section>
            <div class="flex justify-center items-center gap-2">
                <h2 style="color: {{mainColor}};">INTERESTS</h2>
                <div class="w-full flex-1 h-[1px]" style="background-color: {{mainColor}};"></div>
            </div>
            <div class="flex flex-col justify-between items-start mx-2">
                {{#interests}}
                <div class="flex items-center gap-2">
                    <p>{{.}}</p>
                </div>
                {{/interests}}
            </div>
        </section>
        {{/interests.length}}
    </div>
</div>
`;

export const coverTemp = `
<div class="bg-white h-full w-full">
  <div class="w-full bg-[#ffffff] p-[10px] flex flex-col justify-center items-center">
    <div class="flex flex-col w-full">
          <h1 class="text-[20px] font-bold text-black ">{{fullName}}</h1>
          <p class="text-[16px] font-bold text-black">{{jobTitle}}</p>
            <div class="flex flex-col items-end">
              {{#address}}
                <p class="text-[14px] text-black italic"> {{address}}</p>
              {{/address}}
              
              <p class="text-[14px] text-black italic">
                {{email}} 
              </p>
              {{#phone}}
                <p class="text-[14px] text-black italic"> {{phone}}</p>
              {{/phone}}
            </div>
    </div>

    <div class="w-full h-[1px] bg-black m-4"></div>

    <div class="flex flex-col w-full h-full">
        <div class="mb-[10px]">
          <p>To,</p>
          <p class="font-semibold text-[16px]">{{managerName}}</p>
          <p class="text-[14px]">{{companyName}}</p>
        </div>

        <div class="mb-[10px]">
          <p class="text-[14px] text-gray-600">{{createdAt}}</p>
        </div>

        {{#managerName}}
          <div>
            <p class="text-[14px]">Dear {{managerName}},</p>
          </div>
      {{/managerName}}  

        {{#letterDetail}}
        <div class="text-[16px] text-black">
          {{letterDetail}}
        </div>
      {{/letterDetail}}

      <div class="mt-4">
        <p>Yours sincerely,</p>
        <p class="font-semibold">{{fullName}}</p>
      </div>
    </div>
  </div>
`;

export const coverletter1 = `<div class="bg-white h-full w-full">
    <div class="w-full bg-[#338078] p-[10px] flex flex-col justify-center items-center">
      <h1 class="text-[24px] font-bold text-white">{{fullName}}</h1>
      <p class="text-[18px] text-white italic">{{jobTitle}}</p>
      <div class="text-[16px] mt-4 text-white">
        <p>{{email}}</p>
        <p>{{phone}}</p>
        <p>{{address}}</p>
      </div>
    </div>

    <div class="p-[20px] bg-gray-100">
      <div class="mb-[10px]">
        <p>To,</p>
        <p class="font-semibold text-[16px]">{{managerName}}</p>
        <p class="text-[14px]">{{companyName}}</p>
        <p class="text-[14px] text-gray-600">{{createdAt}}</p>
      </div>

      {{#managerName}}
          <div>
            <p class="text-[14px]">Dear {{managerName}},</p>
          </div>
      {{/managerName}}  

 			{{#letterDetail}}
        <div class="text-[16px] text-black">
          {{letterDetail}}
        </div>
      {{/letterDetail}}

      <div class="mt-4">
        <p>Yours sincerely,</p>
        <p class="font-semibold">{{fullName}}</p>
      </div>
    </div>
  </div>`;

export const coverletter2 = `<div class="bg-white h-full w-full">
  <div class="w-full bg-[#ffffff] p-[10px] flex flex-col justify-center items-center">
    <div class="flex flex-col w-full">
          <h1 class="text-[20px] font-bold text-black ">{{fullName}}</h1>
          <p class="text-[16px] font-bold text-black">{{jobTitle}}</p>
            <div class="flex flex-col items-end">
              {{#address}}
                <p class="text-[14px] text-black italic"> {{address}}</p>
              {{/address}}
              
              <p class="text-[14px] text-black italic">
                {{email}} 
              </p>
              {{#phone}}
                <p class="text-[14px] text-black italic"> {{phone}}</p>
              {{/phone}}
            </div>
    </div>

    <div class="w-full h-[1px] bg-black m-4"></div>

    <div class="flex flex-col w-full h-full">
        <div class="mb-[10px]">
          <p>To,</p>
          <p class="font-semibold text-[16px]">{{managerName}}</p>
          <p class="text-[14px]">{{companyName}}</p>
        </div>

        <div class="mb-[10px]">
          <p class="text-[14px] text-gray-600">{{createdAt}}</p>
        </div>

        {{#managerName}}
          <div>
            <p class="text-[14px]">Dear {{managerName}},</p>
          </div>
      {{/managerName}}  

        {{#letterDetail}}
        <div class="text-[16px] text-black">
          {{letterDetail}}
        </div>
      {{/letterDetail}}

      <div class="mt-4">
        <p>Yours sincerely,</p>
        <p class="font-semibold">{{fullName}}</p>
      </div>
    </div>
  </div>`;

export const coverletter3 = `<div class="w-full bg-blue-600"  id="cover-letter-preview">
<header class=" text-white p-8">
  <div class="flex justify-between items-start">
    {{#jobTitle}}
      <p class="text-xl text-white font-light">{{jobTitle}}</p>
    {{/jobTitle}}

    <div>
      {{#fullName}}
        <h1 class="text-2xl text-white font-bold mb-1">{{fullName}}</h1>
      {{/fullName}}

      {{#phone}}
        <p class="text-white">{{phone}}</p>
      {{/phone}}

      {{#email}}
        <p class="text-white">{{email}} </p>
      {{/email}}
    </div>
  </div>
</header>

<main class="p-8 space-y-6">
  <div class="space-y-2">
    <p class="text-white">To:
    {{#companyName}}
      {{companyName}},
    {{/companyName}}
    </p>
    {{#managerName}}
      <p class="text-white">{{managerName}}</p>
    {{/managerName}}
  </div>

  {{#letterDetail}}
  <div class="space-y-4 text-gray-800">
    <p class="text-white">{{letterDetail}}</p>
  </div>
  {{/letterDetail}}

  {{#address}}
    <div class="mt-8 text-sm text-gray-600">
      <p class="text-white">{{address}}</p>
    </div>
  {{/address}}
</main>
</div>`;
