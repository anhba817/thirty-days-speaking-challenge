export interface Keyword {
  word: string;
  vietnamese: string;
  example: string;
}

export interface Question {
  text: string;
  structure: string;
  tips: string[];
  examples: {
    6: string[];
    7: string[];
    8: string[];
  };
}

export interface DayChallenge {
  id: number;
  phase: 1 | 2 | 3;
  title: string;
  description: string;
  keywords: Keyword[];
  questions: Question[];
}

export const CHALLENGE_DATA: DayChallenge[] = [
  {
    id: 1,
    phase: 1,
    title: "Setting Your English Goals",
    description: "Learn vocabulary about study goals, methods, and motivation.",
    keywords: [
      { word: "set a goal", vietnamese: "đặt mục tiêu", example: "I set a goal to achieve an IELTS band score of 7.5 this year." },
      { word: "immerse yourself in", vietnamese: "đắm mình vào", example: "To improve fast, you must immerse yourself in the language every day." },
      { word: "consistent practice", vietnamese: "luyện tập kiên trì", example: "Consistent practice is the key to mastering any language." },
      { word: "break down barriers", vietnamese: "phá vỡ rào cản", example: "Learning English helps me break down barriers and connect with people globally." }
    ],
    questions: [
      { 
        text: "Why do you want to learn English?", 
        structure: "goal → reason → time frame",
        tips: ["Start with a specific goal", "Explain the reason (work, study)", "Add a timeframe"],
        examples: {
          6: [
            "I want to learn English because I want to study in Australia next year. I need a band score of 6.0 for my visa. I think learning English will help me find a good job in the future too. I hope to get this score in 6 months.",
            "I am learning English to get a better job in the tech industry. Most documents are in English so I need to understand them. I want to be a lead developer one day. I am studying every day to improve my skills.",
            "I like traveling and English is spoken everywhere. I want to talk to people from different countries. I hope to be fluent before my next trip to Europe in December."
          ],
          7: [
            "I'm learning English primarily because I intend to apply for a postgraduate degree in Australia. My target is a 7.0 band score, which is necessary for my university admission. Beyond that, I believe reaching this level will significantly enhance my career prospects globally. I'm aiming to achieve this by the end of this year.",
            "My main goal is to advance my career in the technology sector. Since English is the primary language for technical documentation, being proficient is essential for my role. I'm working hard to improve so I can eventually take on more responsibility at work. I plan to reach a high level of proficiency within the next year.",
            "I’m an enthusiastic traveler, and I’ve realized that English is the most common language worldwide. I want to be able to have deeper conversations with locals rather than just basic interactions. I’ve set a goal for myself to become much more confident in speaking before my trip to Europe next winter."
          ],
          8: [
            "To be perfectly honest, my primary motivation stems from a desire to pursue postgraduate studies in Australia next year. I'm aiming for an overall band score of 7.5, not just as a formality, but to ensure I can truly thrive in a demanding academic environment. I'm hopeful that with rigorous preparation, I'll be able to reach this milestone by the onset of winter.",
            "Primarily, I've embarked on this linguistic journey to facilitate my career progression within the tech industry. Given that the preponderance of technical documentation and global discourse is conducted in English, achieving a high degree of proficiency is indispensable. I'm confident that honing my communication skills will be the catalyst for my promotion to a lead role within the next 24 months.",
            "Broadly speaking, I'm an avid traveler, and English serves as the quintessential lingua franca. My aspiration is to be able to engage in profound conversations with individuals from diverse cultural backgrounds, transcending mere transactional interactions. I've set myself a stringent deadline to attain conversational fluency before my impending European tour."
          ]
        }
      },
      { 
        text: "How do you stay motivated?", 
        structure: "method → benefit → example",
        tips: ["Mention tracking progress", "Explain how it helps", "Give a specific routine example"],
        examples: {
          6: [
            "I stay motivated by writing down what I learn in a journal. It feels good to see how much I have learned. I like looking back at my old notes to see my progress.",
            "I give myself rewards when I finish a difficult lesson. For example, I might go to a nice cafe after a long study session. This makes learning more fun for me.",
            "I listen to English podcasts and watch movies to make learning interesting. I try to listen to something every morning on my way to work. It helps me stay sharp."
          ],
          7: [
            "I keep my motivation high by keeping a detailed record of my progress in a study journal. Seeing my improvement in writing provides a great sense of achievement. It’s very satisfying to see how my vocabulary has grown over the last few months.",
            "I’ve set up a reward system where I celebrate my study milestones with things I enjoy. For instance, if I finish a hard grammar unit, I treat myself to a nice dinner. This positive reinforcement really helps me stay focused even during difficult weeks.",
            "To keep things interesting, I try to use English in my daily life through podcasts and films. By making English part of my routine, it doesn't feel like a chore anymore. I usually listen to business podcasts during my commute, which keeps me engaged and improves my listening skills."
          ],
          8: [
            "Maintaining momentum can be quite a feat, so I personally rely on meticulous progress tracking via a reflective journal. Seeing a tangible record of my linguistic development provides a profound sense of accomplishment that keeps me driven. It's incredibly gratifying to look back and realize how my vocabulary has expanded exponentially over time.",
            "I've cultivated a rewarding system that links my academic milestones with personal gratifications. For instance, successfully navigating a dense grammar unit or mastering a complex set of idioms might earn me a visit to my favorite artisanal bistro. This positive reinforcement mechanism effectively sustains my enthusiasm for even the most arduous study sessions.",
            "To keep the learning process engaging, I strive to immerse myself in authentic English media, ranging from thought-provoking podcasts like 'Modern Love' to nuanced cinematic pieces. By integrating English into my daily lifestyle, it ceases to be a chore and becomes an enriching pursuit. I've made it a habit to tune into The Economist's podcasts during my morning commute, which keeps me both informed and linguistically sharp."
          ]
        }
      },
      { 
        text: "What are the biggest challenges you face when learning English?", 
        structure: "challenge → impact → solution",
        tips: ["Identify 1-2 core difficulties", "Explain how they affect you", "Propose a way to overcome them"],
        examples: {
          6: [
            "My biggest challenge is understanding fast English, especially in movies. I often get confused when people talk too quickly. I try to practice by listening to short clips and repeating after them.",
            "I think grammar is very difficult because there are so many rules. Sometimes it's overwhelming to learn everything. I am using an app to help me find my mistakes and fix them.",
            "Finding time to study is hard because I have a busy job. It's easy to forget to study when I'm tired. I'm trying to wake up early and study for 30 minutes before I go to work."
          ],
          7: [
            "One of the hardest things for me is understanding natural, fast-paced speech in TV shows. I often find it difficult to keep up with the conversation. To solve this, I’ve started using the shadowing technique, where I repeat what native speakers say to improve my rhythm.",
            "Grammar rules and all their exceptions are definitely my biggest weakness. It can be quite frustrating to try and remember all the different tenses. However, I’ve been using some AI platforms that give me feedback on my errors, which is helping a lot.",
            "Finding enough time for dedicated practice while working full-time is a constant struggle. It’s very easy to let other things get in the way of my studies. To fix this, I've created a new routine where I spend 40 minutes on English every morning before my workday starts."
          ],
          8: [
            "Without a doubt, my most significant hurdle is deciphering the nuances of fast-paced, colloquial speech, particularly in unscripted media. I often find myself trailing behind the dialogue, which can be somewhat disheartening. To tackle this, I've adopted a 'shadowing' technique, repeatedly listening to and mimicking short, native-level clips to attune my ear to natural rhythm and intonation.",
            "Grammatical intricacies and the sheer volume of exceptions have always been my Achilles' heel. It can feel quite overwhelming to navigate the labyrinth of conditional sentences or phrasal verbs. However, I'm combatting this by utilizing sophisticated AI-driven platforms that provide granular feedback, allowing me to identify and rectify my errors in real-time.",
            "Logistically, carving out sufficient time for deliberate practice amidst a demanding work schedule is a recurring challenge. It's all too easy for language learning to take a backseat to more immediate professional obligations. To circumvent this, I've transitioned to a 'deep work' morning routine, dedicating 40 minutes of undistracted time to English before the workday commences."
          ]
        }
      }
    ]
  },
  {
    id: 2,
    phase: 1,
    title: "Introducing Yourself",
    description: "Vocabulary for introducing yourself, background, and interests.",
    keywords: [
      { word: "originally from", vietnamese: "đến từ", example: "I’m originally from Da Lat, but I moved to Ho Chi Minh for work." },
      { word: "based in", vietnamese: "đang sống ở", example: "I am currently based in Hanoi for work purposes." },
      { word: "strengths and weaknesses", vietnamese: "điểm mạnh - điểm yếu", example: "One of my strengths is being hardworking." }
    ],
    questions: [
      { 
        text: "Can you introduce yourself?", 
        structure: "name/age → hometown → job/study",
        tips: ["Keep it concise", "Mention your educational background"],
        examples: {
          6: [
            "My name is Linh, I'm 24 years old. I'm a software developer from Da Lat but I live in Saigon now. I have worked for 2 years. I studied computer science at university.",
            "I am Nam and I live in Hanoi. I am a student at university. I'm originally from a small town in the north. I like living in the city because it is very busy.",
            "I'm Minh. I come from Da Nang but now I live in the capital. I'm an English teacher. I love my job because I can meet many people."
          ],
          7: [
            "I'm Linh, a 24-year-old software developer currently working in Saigon. I was born and raised in Da Lat but moved here for my career. I've been a junior developer for about two years now, mostly working on frontend projects.",
            "My name is Nam. I'm currently based in Hanoi where I'm a final-year student. I hail from a quiet town in the north, but I really enjoy the energy of the capital. My studies are focused on International Business.",
            "I'm Minh and I was raised in Da Nang, though I've lived in the capital for several years. I work as an English instructor at a language center. I've always been interested in languages and communication."
          ],
          8: [
            "I'm Linh, a 24-year-old software developer currently navigating the early stages of my career. While I was born and bred in the scenic highlands of Da Lat, I've subsequently relocated to the bustling metropolis of Saigon to pursue better professional opportunities. I've been honing my expertise as a junior developer for a couple of years now, primarily focusing on frontend frameworks.",
            "My name is Nam, and I'm currently stationed in Hanoi, where I'm completing the final year of my undergraduate studies in International Business. I originally hail from a quaint northern township, but the dynamism of the capital has truly broadened my horizons. My academic journey has been largely focused on navigating the complexities of global trade and economics.",
            "Hi, I'm Minh. I was raised in the coastal city of Da Nang, though I'm now a resident of the capital. I've dedicated the past few years to the field of ELT, working as an English instructor at a prominent language center. My lifelong fascination with linguistics and cross-cultural communication is what ultimately steered me towards this fulfilling career path."
          ]
        }
      },
      { 
        text: "What are your main strengths and weaknesses?", 
        structure: "strength → example → weakness → improvement",
        tips: ["Be honest but positive", "Show that you are working on your weaknesses"],
        examples: {
          6: [
            "I am a very hard worker and very organized. This helps me finish my work on time. One of my weaknesses is public speaking, I get nervous. I am taking a class to help me be more confident.",
            "I am good at working in a team and solving problems. However, I sometimes spend too much time on small details. I am trying to work faster and focus on the big picture.",
            "I think my strength is that I'm very analytical. I like working with data. My weakness is that I don't delegate work well. I am learning to trust my team more."
          ],
          7: [
            "I'm proud of my organizational skills, which help me stay on track and meet my goals. On the other hand, I used to be quite nervous about public speaking. Recently, I've joined a course to improve my communication and feel more confident.",
            "I'm a resilient person who enjoys working with others to solve problems. My main weakness is that I sometimes focus too much on minor details, which slows me down. I’m working on balancing precision with speed in my projects.",
            "One of my strengths is definitely my analytical approach to problems. I'm good at finding insights in data. However, I struggle with delegating tasks to others. I am focusing on empowering my colleagues and trusting their work more."
          ],
          8: [
            "I pride myself on my meticulous nature and organizational prowess, which have been instrumental in consistently hitting my KPIs. Conversely, I've recognized that public speaking is an area where I've historically felt somewhat tentative. To mitigate this, I've proactively enrolled in a Toastmasters course to refine my oratory skills and bolster my confidence when addressing large audiences.",
            "I would characterize myself as a highly resilient individual with a knack for collaborative problem-solving. On the flip side, I've occasionally been prone to over-analyzing minor details, which can sometimes impede my efficiency. I'm consciously working on adopting a more holistic view of my projects to ensure a better balance between precision and productivity.",
            "One of my core strengths lies in my analytical mindset and my ability to derive actionable insights from complex data sets. However, I've identified that I sometimes struggle with the art of delegation, often feeling a compulsion to oversee every facet of a project. I'm currently focused on empowering my colleagues and trusting in their expertise to foster a more effective team dynamic."
          ]
        }
      },
      { 
        text: "What are your future plans for your career?", 
        structure: "current role → goal → action plan",
        tips: ["Mention a specific position or field", "Explain the 'why' behind the goal"],
        examples: {
          6: [
            "I'm a marketing assistant now and I want to be a manager in the future. I'm taking some courses to learn about marketing. I hope to get a promotion in 3 years.",
            "I want to work at a big global company after I graduate. I think it will be a good place to learn new things. I'm studying hard to prepare for my future job.",
            "I want to start my own fashion brand one day. I am learning about how to run a business. I want to make clothes that are good for the environment."
          ],
          7: [
            "Currently, I'm a marketing assistant but my goal is to become a digital marketing manager. I'm studying consumer behavior and analytics to help me reach this position in three years.",
            "I’m an aspiring finance professional and I want to work for a major global firm when I finish my studies. I think a big institution will be the best place for me to gain the necessary experience.",
            "My long-term dream is to launch my own ethical fashion label. I'm currently learning about supply chain management and raising capital. I hope to launch a pilot collection fairly soon."
          ],
          8: [
            "Occupying a marketing assistant role at present, my ultimate ambition is to transition into a strategic digital marketing management position. To facilitate this move, I'm currently pursuing advanced certifications in consumer behavior and data analytics, with the aim of stepping into a leadership role within the next three years.",
            "As an aspiring finance professional, I'm setting my sights on a position within a top-tier global investment firm following my graduation. I'm convinced that the rigorous environment of a high-stakes financial institution will provide a steep learning curve and the hands-on experience necessary to excel in this competitive industry.",
            "I've nurtured a long-standing aspiration to launch a sustainable fashion label that champions ethical production. I'm currently in the process of building the necessary capital and expanding my knowledge of supply chain management. My goal is to release a pilot collection once I've solidified my understanding of the market landscape."
          ]
        }
      }
    ]
  },
  {
    id: 3,
    phase: 1,
    title: "My Daily Routine",
    description: "Describe your morning journey and daily tasks.",
    keywords: [
      { word: "wake up early", vietnamese: "thức dậy sớm", example: "I always wake up early to prepare for my busy schedule." },
      { word: "commute", vietnamese: "di chuyển đi làm/học", example: "My commute to the office is quite long, so I leave early." },
      { word: "kick-start the day", vietnamese: "khởi động ngày mới", example: "Coffee is essential for me to kick-start the day." }
    ],
    questions: [
      { 
        text: "What does your morning routine look like?", 
        structure: "wake up → preparation → breakfast → commute",
        tips: ["Use connecting words", "Describe the first thing you do"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My morning regimen is quite meticulously structured, typically commencing at the crack of dawn, around 6 AM. I initiate the day with some light calisthenics followed by a brief meditative session to sharpen my focus. After a nutrient-dense breakfast, I embark on a 30-minute commute to the office, which I utilize for listening to educational podcasts.",
          "To be honest, I wouldn't exactly classify myself as a morning person. My routine usually involves a somewhat hurried preparation after waking up at 8 AM. I rely on a robust cup of coffee to kick-start my cognitive processes before catching the shuttle to the university campus.",
          "In the early hours, I prefer a more tranquil and contemplative pace. I usually begin my day with a cup of premium green tea while perusing the morning's headlines for about fifteen minutes. Following a balanced breakfast, I commute to my workplace via motorbike, a journey that typically spans twenty minutes of urban navigation."
          ]
        }
      },
      { 
        text: "How do you usually spend your evenings?", 
        structure: "work finish → activity → dinner → sleep",
        tips: ["Mention how you unwind", "Talk about hobbies or family time"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Upon the conclusion of my professional duties at 6 PM, I generally retreat home to spend quality time with my dog, which I find immensely grounding. I usually dedicate an hour to some leisure reading or exploring a new hobby to unwind from the day's stresses. I'm quite disciplined about my sleep schedule, aiming to be in bed by 11 PM to ensure optimal cognitive function the next day.",
          "I'm a firm believer in utilizing my evenings for continuous self-improvement and intellectual growth. I typically devote an hour to refining my linguistic skills or delving into a thought-provoking non-fiction book. This is followed by a communal meal with my family, which serves as the emotional highlight of my day.",
          "Actually, my evenings are characterized by a fairly active social calendar. I frequently congregate with peers for a rigorous workout session or a casual dinner engagement. I find that maintaining an active physical presence in the evening helps me recalibrate my energy levels and facilitates a more restorative sleep."
          ]
        }
      },
      { 
        text: "What do you like to do on weekends to relax?", 
        structure: "destination/activity → feeling → reason",
        tips: ["Talk about escaping the city", "Mention hobbies you don't have time for during the week"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "On weekends, I'm particularly fond of venturing into the countryside for long, restorative hikes. Escaping the relentless hustle and bustle of the metropolis allows me to reconnect with nature and recalibrate my internal compass. I consistently return from these excursions feeling rejuvenated and adequately prepared to tackle the upcoming week's challenges.",
          "To be perfectly frank, I'm something of a homebody. I tend to spend my weekends catching up on much-needed rest and experimenting with complex culinary recipes. I find the process of cooking to be exceptionally therapeutic and I take great pleasure in sharing these artisanal meals with my loved ones.",
          "Actually, I've established a tradition of spending my Saturdays at a quaint local cafe, immersed in literature or working on my sketches. The serene atmosphere is conducive to deep focus and creative expression. On Sundays, I typically pay a visit to my grandparents for a leisurely brunch, which is a cherished family ritual."
          ]
        }
      }
    ]
  },
  {
    id: 4,
    phase: 1,
    title: "Describing Your Hometown",
    description: "Learn to talk about your hometown and local features.",
    keywords: [
      { word: "tourist attractions", vietnamese: "điểm thu hút du lịch", example: "My hometown has several tourist attractions, including an old lighthouse." },
      { word: "local specialties", vietnamese: "đặc sản địa phương", example: "The local specialties in my hometown, especially seafood, are fresh." },
      { word: "cost of living", vietnamese: "chi phí sinh hoạt", example: "The cost of living in my hometown is fairly affordable." }
    ],
    questions: [
      { 
        text: "Where is your hometown located?", 
        structure: "location → size → main feature",
        tips: ["Mention the general location", "Describe city atmosphere (peaceful/busy)"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My hometown is nestled in the heart of central Vietnam, perched elegantly along the coastline. While it's a relatively modest township in terms of size, it's globally renowned for its pristine beaches and laid-back, tranquil ambiance. The confluence of natural beauty and historical charm makes it a quintessential destination for those seeking a reprieve from urban life.",
          "I hail from the vibrant metropolis of Ho Chi Minh City, strategically located in the southern region of the country. It's a sprawling, high-octane urban center that is perpetually in motion, characterized by its iconic skyscrapers and an extraordinarily diverse culinary landscape.",
          "I originally come from a serene rural enclave situated within the Mekong Delta. It's a picturesque village defined by its verdant fruit orchards and a labyrinth of winding waterways. The pace of life there is remarkably tranquil, offering a stark contrast to the frenetic energy of the city."
          ]
        }
      },
      { 
        text: "What are some popular local specialties in your hometown?", 
        structure: "dish name → ingredients → taste/feeling",
        tips: ["Describe the flavor (spicy, sweet, savory)", "Mention why it's famous"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Undoubtedly, the culinary hallmark of my hometown is our incredibly fresh seafood, with the succulent grilled lobsters being a particular standout. They are harvested daily from the local waters and prepared using traditional techniques that accentuate their natural sweetness. Tourists from across the globe flock to our local markets specifically to savor these authentic flavors.",
          "The signature dish of my city is a robustly flavored, spicy noodle soup that is richly infused with indigenous herbs and premium cuts of beef. Its aromatic profile is exceptionally bold, serving as a quintessential representation of our culinary heritage. I invariably recommend it to any visitor seeking an authentic gastronomic experience.",
          "Actually, we're rather renowned for our eclectic street food scene, particularly our artisanal crispy pancakes filled with fresh shrimp and bean sprouts. They offer a delightful contrast of textures and are traditionally accompanied by a selection of garden-fresh herbs and a piquant dipping sauce."
          ]
        }
      },
      { 
        text: "What do you like most about the place where you live?", 
        structure: "feature → benefit → personal opinion",
        tips: ["Talk about the people or the environment", "Mention the convenience or the scenery"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "What I find most appealing about my current residence is its vibrant nocturnal energy and the sheer abundance of artisanal coffee houses. There's a constant sense of discovery here, with new cultural pockets emerging regularly, which makes the living experience exceptionally dynamic. It's a place that fosters creativity and constant personal evolution.",
          "To be perfectly honest, I place a high premium on the remarkable convenience of having all essential amenities within a manageable walking distance. The ability to access a well-stocked grocery store, a local pharmacy, or a verdant park within minutes of my doorstep is a significant boon to my daily productivity and overall well-being.",
          "Actually, the attribute I most profoundly appreciate is the deep-seated sense of community that permeates my neighborhood. My neighbors are exceptionally gregarious and always willing to lend a hand, fostering a palpable sense of belonging that is often conspicuously absent in larger metropolises."
          ]
        }
      }
    ]
  },
  {
    id: 5,
    phase: 1,
    title: "Work & Jobs",
    description: "Vocabulary for career paths, environment, and satisfaction.",
    keywords: [
      { word: "career path", vietnamese: "con đường sự nghiệp", example: "I'm currently focusing on a career path in digital marketing." },
      { word: "work-life balance", vietnamese: "cân bằng công việc - cuộc sống", example: "Achieving a good work-life balance is crucial for mental health." },
      { word: "job satisfaction", vietnamese: "sự hài lòng công việc", example: "I think job satisfaction matters more than salary." }
    ],
    questions: [
      { 
        text: "What do you do for a living?", 
        structure: "job title → daily tasks",
        tips: ["Introduce your field", "Briefly mention 1-2 main responsibilities"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I currently serve as a marketing executive for a prominent domestic fashion house, where I spearhead our digital outreach strategies. My primary responsibilities revolve around curating high-impact content for our social media channels and analyzing consumer engagement metrics to refine our brand positioning. It's a demanding yet incredibly rewarding role that requires a blend of creative flair and analytical rigor.",
          "Technically speaking, I'm presently a student, so I haven't yet embarked on a full-time career. However, I'm currently undertaking a rigorous internship within the financial sector, where I assist with intricate data entry tasks and contribute to preliminary financial modeling. It's a steep learning curve that is providing me with invaluable industry insights.",
          "I've been operating as a freelance graphic designer for the past three years, with a specialized focus on brand identity and user interface design. My day-to-day involves collaborating closely with clients to translate their visions into compelling visual narratives and brainstorming innovative design concepts."
          ]
        }
      },
      { 
        text: "What is the most challenging part of your job?", 
        structure: "challenge → impact → coping mechanism",
        tips: ["Mention deadlines or complex tasks", "Explain how you handle stress"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "One of the most formidable challenges I face in my profession is the necessity of navigating high-pressure situations against rigid, non-negotiable deadlines. This can be significantly taxing, but I've developed robust coping mechanisms, such as prioritizing tasks through a hierarchical matrix and employing time-blocking techniques to maintain productivity. Additionally, I find that brief periods of mindfulness throughout the day are essential for sustained mental clarity.",
          "I find that effectively communicating with particularly demanding or recalcitrant clients requires an extraordinary degree of patience and diplomatic finesse. My strategy involves active listening to truly understand their underlying concerns and maintaining a strictly professional demeanor to facilitate a mutually beneficial resolution.",
          "Actually, a significant hurdle in my field is the imperative to stay abreast of the extraordinarily rapid technological advancements. I'm compelled to dedicate a substantial portion of my personal time to mastering new software and design methodologies to ensure that my skill set remains competitive and relevant."
          ]
        }
      },
      { 
        text: "What is your idea of a perfect work-life balance?", 
        structure: "definition → ideal schedule → why it matters",
        tips: ["Talk about boundaries", "Mention the importance of mental health"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In my estimation, a quintessential work-life balance centers on the ability to maintain a clear demarcation between professional obligations and personal pursuits. It involves being fully present in the workplace while having the discipline to disconnect entirely during off-hours to nourish one's personal relationships and well-being. Ultimately, achieving this equilibrium is paramount for long-term psychological resilience and overall life satisfaction.",
          "To me, it entails a highly flexible schedule that empowers me to work during my peaks of productivity while ensuring ample time for physical exercise and social engagement. I believe that a harmonious integration of work and life facilitates superior performance in both spheres and prevents the onset of professional burnout.",
          "Actually, I believe that achieving a sustainable balance is predicated on the ability to set firm boundaries and recognize when to decline additional commitments. Prioritizing self-care and personal time is essential to ensure that professional endeavors do not invariably overshadow one's personal identity and holistic health."
          ]
        }
      }
    ]
  },
  {
    id: 6,
    phase: 1,
    title: "Hobbies & Interests",
    description: "Talk about your leisure time and favorite activities.",
    keywords: [
      { word: "leisure time", vietnamese: "thời gian rảnh rỗi", example: "I spend most of my leisure time learning English." },
      { word: "recharge my batteries", vietnamese: "nạp lại năng lượng", example: "A long walk in the park is the best way to recharge my batteries." },
      { word: "be into something", vietnamese: "cực kỳ thích cái gì", example: "I'm really into photography these days." }
    ],
    questions: [
      { 
        text: "What is your favorite hobby, and how long have you been doing it?", 
        structure: "name of hobby → duration/frequency → what you enjoy most",
        tips: ["Mention the duration (years/months)", "Explain the feeling (flow/relax)"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My primary recreational pursuit is the piano, an instrument I've been dedicated to for upwards of five years. I strive to carve out at least an hour each evening for deliberate practice, focusing on mastering complex classical compositions. I find that the state of 'flow' achieved during these sessions is unparalleled, acting as a profound meditative outlet after a taxing day.",
          "To be honest, I've recently become quite enamored with landscape photography. I initially ventured into this hobby about a year ago when I acquired a professional-grade DSLR. What I find most compelling is the challenge of capturing the ephemeral quality of natural light and the unique character of candid moments.",
          "Actually, I've been something of a bibliophile since my early childhood, and I currently dedicate much of my leisure time to modern literary fiction. I find that getting lost in intricate narratives is an exceptional way to recalibrate my focus and recharge my cognitive batteries."
          ]
        }
      },
      { 
        text: "Why do you find this hobby so interesting?", 
        structure: "reason 1 → reason 2 → personal growth",
        tips: ["Talk about the skills you've gained", "Mention the social or emotional benefits"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I find the piano particularly captivating because it represents a harmonious blend of technical precision and artistic expression. It has instilled in me a deep sense of discipline and perseverance, as mastering intricate pieces requires immense patience. Furthermore, the ability to communicate nuanced emotions through music provides a unique sense of catharsis.",
          "Photography is intellectually stimulating for me as it necessitates a fundamental shift in perception. It encourages me to find aesthetic value in the mundane and appreciate the intricate details of the world that I might otherwise overlook in my daily routine.",
          "I find literature genuinely rewarding because it fosters empathy and broadens my understanding of diverse cultural paradigms and human experiences. It essentially offers a window into worlds and perspectives far removed from my own current reality."
          ]
        }
      },
      { 
        text: "Is there a new hobby you’d like to try in the future?", 
        structure: "hobby name → why → when/how",
        tips: ["Be creative", "Mention something that complements your current skills"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In the near future, I'm keen to delve into the art of pottery, as I believe the tactile nature of working with clay would be immensely grounding. I'm currently scouting for local workshops that offer comprehensive introductory courses, with the intention of enrolling once my professional commitments allow for a more flexible schedule.",
          "Well, I've harbored a long-standing desire to master the art of surfing. Having always felt a profound connection to the ocean, I believe it would be an exhilarating way to challenge my physical limits and experience the raw power of nature during the summer months.",
          "Actually, I'm quite intrigued by the prospect of learning to code. I recognize it as an indispensable skill in our increasingly digitalized society, and I aspire to eventually possess the capability to engineer my own bespoke software or digital platforms."
          ]
        }
      }
    ]
  },
  {
    id: 7,
    phase: 1,
    title: "Favorite Meal or Food",
    description: "Describe your cuisine preferences and eating habits.",
    keywords: [
      { word: "signature dish", vietnamese: "món đặc trưng", example: "Pho is considered the signature dish of Vietnamese cuisine." },
      { word: "balanced diet", vietnamese: "chế độ ăn cân bằng", example: "I try to maintain a balanced diet with vegetables and lean protein." },
      { word: "home-cooked meal", vietnamese: "bữa ăn nấu tại nhà", example: "Nothing compares to a simple home-cooked meal." }
    ],
    questions: [
      { 
        text: "What kind of food do you usually enjoy eating?", 
        structure: "preferred food type → specific example → reason",
        tips: ["Start with the type (seafood, healthy)", "Give a specific dish example"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm particularly partial to the elegance of Japanese cuisine, specifically the nuanced flavors found in premium sashimi and nigiri. The ephemeral freshness and the meticulous attention to detail in its preparation align perfectly with my aesthetic and health-conscious sensibilities.",
          "While I relish variety, nothing truly compares to the profound sense of comfort I derive from my mother's signature caramelized pork dish. The intricate balance of sweet and savory flavors evokes a deep-seated sense of nostalgia and familial warmth.",
          "I fundamentally strive to maintain a meticulously balanced diet, prioritizing nutrient-dense whole foods and lean proteins. For instance, I frequently opt for vibrant, multi-textured salads accompanied by grilled poultry, as they offer sustained energy and culinary satisfaction."
          ]
        }
      },
      { 
        text: "Do you prefer eating at home or at a restaurant? Why?", 
        structure: "preference → reason 1 → reason 2",
        tips: ["Talk about the atmosphere", "Mention the cost and health aspect"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I fundamentally prefer the intimacy and control of a home-cooked meal for the majority of the week. Preparing my own food allows me to source high-quality, organic ingredients and tailor each dish precisely to my nutritional requirements, which I find immensely satisfying.",
          "Well, I do occasionally enjoy the sophisticated ambiance of a highly-regarded restaurant to explore innovative culinary techniques and exotic flavor profiles that I cannot easily replicate in my own kitchen. It's also an excellent way to socialize in a vibrant setting.",
          "Actually, I've adopted a somewhat hybrid approach. During the professional week, I prioritize healthy, home-prepared meals for efficiency and well-being, whereas weekends are reserved for exploring the diverse offerings of local artisanal bistros to unwind."
          ]
        }
      },
      { 
        text: "What is a signature dish from your country that everyone should try?", 
        structure: "dish name → description → why it's special",
        tips: ["Describe the unique flavors", "Mention the cultural significance"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "No visitor should leave without experiencing Pho, our quintessential beef noodle soup. Its aromatic, deeply complex broth, simmered for hours with charred aromatics and marrow, is a culinary masterpiece that encapsulates the soul of our nation's gastronomy.",
          "Well, the Banh Mi is an absolute culinary necessity. It's an artisanal baguette that harmonizes savory meats, creamy pate, and garden-fresh herbs. The interplay of the crusty bread and the rich fillings has propelled it to global recognition for good reason.",
          "Actually, I'd strongly recommend Bun Cha, which features expertly grilled pork served alongside vermicelli and a nuanced dipping sauce. It's a perfectly balanced, vibrant meal that is a perennial favorite for both its flavor profile and cultural heritage."
          ]
        }
      }
    ]
  },
  {
    id: 8,
    phase: 1,
    title: "Memorable Experience",
    description: "Vocabulary for telling stories about the past.",
    keywords: [
      { word: "once-in-a-lifetime", vietnamese: "chỉ có một lần trong đời", example: "Meeting my favorite author was a once-in-a-lifetime experience." },
      { word: "step out of my comfort zone", vietnamese: "bước ra khỏi vùng an toàn", example: "That trip forced me to step out of my comfort zone." },
      { word: "valuable lesson", vietnamese: "bài học quý giá", example: "I learned a valuable lesson about being independent." }
    ],
    questions: [
      { 
        text: "Can you describe a memorable experience in your life?", 
        structure: "event → time → place → background",
        tips: ["Set the scene clearly", "Mention why it was a turning point"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "One of the most formative experiences in my life was embarking on a solo expedition through Thailand last summer. It marked a significant turning point as it necessitated absolute self-reliance, compelling me to step decisively outside my comfort zone. Navigating unfamiliar landscapes and cultures independently was an incredibly empowering journey.",
          "An indelibly profound moment in my trajectory was my university graduation two years ago. The culmination of years of rigorous academic pursuit, coupled with the pride reflected in my family's presence, created a sense of accomplishment that remains unparalleled.",
          "I vividly recall my initial foray into community service at a local animal shelter. It was an exceptionally poignant experience that instilled in me a deep-seated appreciation for compassion and the immense responsibility we bear towards the more vulnerable members of our ecosystem."
          ]
        }
      },
      { 
        text: "What was a valuable lesson you learned from that experience?", 
        structure: "lesson → application → outcome",
        tips: ["Be specific about the takeaway", "Explain how it has shaped your current mindset"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "The most invaluable takeaway from that solo expedition was the realization of my own resilience and adaptability in the face of unforeseen challenges. This epiphany has profoundly reshaped my professional outlook, enabling me to approach complex problems with a newfound sense of composure.",
          "My graduation served as a powerful validation that relentless effort and steadfast perseverance invariably yield significant results. This realization has motivated me to maintain a rigorous level of discipline in my professional life and to pursue my long-term objectives with unwavering tenacity.",
          "Actually, my time at the shelter underscored the profound importance of civic engagement and empathy. It has profoundly influenced my current values, inspiring me to regularly support local social initiatives and to be more attuned to the diverse needs within my community."
          ]
        }
      },
      { 
        text: "How did that event change your perspective on life?", 
        structure: "before → during → after → new outlook",
        tips: ["Talk about personal growth", "Mention any shifts in your values or priorities"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Prior to that journey, I was often paralyzed by the fear of the unknown, tending to favor predictability over spontaneity. However, that experience served as a catalyst for a profound shift in my perspective, leading me to view challenges as opportunities for self-discovery rather than deterrents.",
          "To be perfectly honest, that event prompted me to recognize that personal fulfillment is derived from the journey itself, rather than merely the destination. I've since learned to appreciate incremental progress and maintain a resilient, positive mindset through life's inevitable fluctuations.",
          "Actually, it completely recalibrated my internal priorities. Whereas I previously fixated almost exclusively on professional attainment, I now place equal value on the health of my interpersonal relationships and community involvement, resulting in a far more holistic outlook on life."
          ]
        }
      }
    ]
  },
  {
    id: 9,
    phase: 1,
    title: "Favorite Books & Movies",
    description: "Express your opinions on art and media.",
    keywords: [
      { word: "emotionally touching", vietnamese: "chạm đến cảm xúc", example: "I find this movie emotionally touching." },
      { word: "leave a deep impression", vietnamese: "để lại ấn tượng sâu sắc", example: "This book left a deep impression on me." },
      { word: "masterpiece", vietnamese: "kiệt tác", example: "The 'Mona Lisa' is a world-famous masterpiece." }
    ],
    questions: [
      { 
        text: "What is your favorite book, movie, or song?", 
        structure: "name → type → general opinion",
        tips: ["Mention the genre", "Explain the main message"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My most treasured literary work is Paulo Coelho's 'The Alchemist,' a profoundly allegorical tale that resonates with anyone striving to fulfill their 'Personal Legend.' Its poignant message regarding the necessity of perseverance and the interconnectedness of all things left an indelible impression on my younger self.",
          "I'm an ardent admirer of Christopher Nolan's 'Interstellar.' It's a cinematic masterpiece that seamlessly blends speculative scientific concepts with a deeply emotive narrative. I find the exploration of the profound bond between parent and child to be incredibly moving.",
          "Actually, my go-to musical composition is John Lennon's 'Imagine.' I find the lyrical content to be exceptionally evocative, and the minimalist melody creates a tranquil and reflective atmosphere. It remains a powerful anthem for global unity and peace."
          ]
        }
      },
      { 
        text: "What kind of books or movies do you usually enjoy? Why?", 
        structure: "genre/type → character → feeling",
        tips: ["Talk about the themes (mystery, romance, action)", "Explain what keeps you engaged"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm consistently drawn to psychological thrillers and intricate mystery novels, as I find the intellectual challenge of deciphering complex plots to be exceptionally engaging. The constant tension and psychological depth of the characters invariably keep me fully immersed in the narrative.",
          "Well, I've always harbored an intense fascination for historical dramas. I find the meticulous reconstruction of past eras and the exploration of the socio-political climates of the time to be incredibly illuminating, providing a unique perspective on our collective history.",
          "Actually, I'm particularly partial to avant-garde animated features, as they often utilize highly imaginative visual metaphors to explore profound human themes. There's a particular sense of wonder and creative ingenuity in these works that I find immensely refreshing."
          ]
        }
      },
      { 
        text: "Do you prefer reading the book or watching the movie version?", 
        structure: "preference → reason 1 → reason 2",
        tips: ["Compare the imagination vs. visual experience", "Mention the depth of the story"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I invariably favor the original literary work, as the written word allows for a degree of psychological depth and interiority that cinema often struggles to replicate. The ability to inhabit a character's internal monologue and the subjective nature of mental visualization provide a far more intellectually stimulating experience.",
          "To be perfectly frank, I frequently find the cinematic adaptation more compelling due to the sensory richness provided by the visual artistry and emotive scores. Cinema has the unique power to synthesize multiple artistic disciplines into a highly condensed and impactful narrative experience.",
          "Actually, I believe the preference is often genre-dependent. While fast-paced speculative fiction often thrives on the silver screen due to its spectacle, character-driven dramas typically benefit from the expansive and nuanced exploration afforded by a novel."
          ]
        }
      }
    ]
  },
  {
    id: 10,
    phase: 1,
    title: "Motivation & Discipline",
    description: "Consistency and overcoming the urge to give up.",
    keywords: [
      { word: "self-discipline", vietnamese: "kỷ luật bản thân", example: "Self-discipline is more important than motivation in the long run." },
      { word: "stay consistent", vietnamese: "duy trì sự đều đặn", example: "It's important to stay consistent when learning a new skill." },
      { word: "long-term commitment", vietnamese: "sự cam kết lâu dài", example: "Learning a language requires long-term commitment." }
    ],
    questions: [
      { 
        text: "Do you think motivation or discipline is more important? Why?", 
        structure: "choose → reason → example",
        tips: ["Compare the two fairly", "Use your daily study routine as an example"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm firmly of the opinion that self-discipline is the cornerstone of long-term success, far outweighing the importance of fleeting motivation. While motivation might provide the initial impetus, it is discipline that ensures consistency during periods of stagnation or fatigue. My rigorous adherence to a daily English study regimen is a testament to the power of established habits over momentary inspiration.",
          "To be perfectly honest, I believe that motivation is indispensable in providing the creative spark necessary to initiate any significant endeavor. However, I concur that without a steadfast long-term commitment, it is exceedingly difficult to transform that initial enthusiasm into substantial and sustainable progress.",
          "In my estimation, success necessitates a delicate equilibrium between both. Motivation acts as the catalyst, but discipline provides the structural framework for consistent growth. For instance, my daily practice is a product of both an innate desire for self-improvement and a disciplined adherence to a predetermined routine."
          ]
        }
      },
      { 
        text: "How do you handle days when you feel like giving up?", 
        structure: "feeling → small step → outcome",
        tips: ["Mention self-care or taking a break", "Explain the importance of not being too hard on yourself"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "On days when I feel mentally drained or tempted to concede, I employ a strategy of 'micro-tasking' to regain my momentum. By breaking down a daunting project into manageable, low-stakes actions, I can circumvent the feeling of being overwhelmed and slowly rebuild my focus and confidence.",
          "Well, I typically allow myself a brief, intentional hiatus to clear my cognitive faculties, whether through an invigorating walk or a focused period of meditation. This facilitates a more objective perspective and enables me to approach the task with renewed vigor and clarity later.",
          "Actually, I find it helpful to reflect on my initial motivations and acknowledge the significant progress I've already achieved. Reconnecting with my primary objectives helps me navigate through temporary setbacks and reinforces my commitment to the overall process."
          ]
        }
      },
      { 
        text: "What is your long-term commitment to learning English?", 
        structure: "goal → duration → action plan",
        tips: ["Mention a specific target (fluency, job promotion)", "Talk about making it a lifelong habit"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My long-term aspiration is to attain a level of near-native proficiency that would facilitate my transition into the global workforce and enable me to operate at the highest professional levels. I'm prepared to invest the necessary time and effort to ensure that English becomes an integral and natural component of my professional identity.",
          "To be perfectly honest, I view the mastery of English as a lifelong intellectual journey. I aspire to reach a stage where I can engage in nuanced and effortless dialogue with individuals from across the globe. My strategy involves setting incremental milestones and continuously exposing myself to sophisticated linguistic contexts.",
          "Actually, I've committed to utilizing English as a strategic tool for my professional advancement. I'm aiming to be capable of leading complex international negotiations and delivering high-impact presentations within the next two years, primarily through focused practice and immersion in professional contexts."
          ]
        }
      }
    ]
  },
  {
    id: 11,
    phase: 2,
    title: "Technology in Life",
    description: "Explore smart devices, digital tools, and the impact of technology.",
    keywords: [
      { word: "smart devices", vietnamese: "thiết bị thông minh", example: "I use many smart devices to make my life easier." },
      { word: "digital tools", vietnamese: "công cụ số", example: "I rely on digital tools, such as apps and online platforms, to study and work." },
      { word: "user-friendly", vietnamese: "dễ sử dụng", example: "Most modern applications are designed to be user-friendly." }
    ],
    questions: [
      { 
        text: "What is the most important piece of technology you use every day?", 
        structure: "naming the device → usage → feeling",
        tips: ["Mention the specific device (smartphone, laptop)", "Explain your primary usage"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Undoubtedly, the smartphone has been the most transformative piece of technology in my lifetime, serving as an indispensable portal to the entirety of human knowledge. Its ability to consolidate myriad functions—from navigation to real-time global communication—into a single handheld device is truly a marvel of modern engineering.",
          "I'd say my laptop is the most essential gadget for me. Since I work remotely, I rely on it for everything from attending meetings to designing prototypes. It's a powerful tool that significantly boosts my productivity and allows for a seamless integration of my professional and personal life.",
          "Actually, I find my noise-canceling headphones to be indispensable. I use them every day to facilitate a state of 'deep work' during my studies in crowded urban environments. They help me create a private, focused sanctuary anywhere, which is crucial for my cognitive performance."
          ]
        }
      },
      { 
        text: "How has technology changed the way we communicate with others?", 
        structure: "past vs present → specific tool → impact",
        tips: ["Mention instant messaging or social media", "Talk about the speed and convenience"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Technology has fundamentally transformed our communicative paradigms, migrating from the traditional, local-centric interactions to a borderless, instantaneous digital discourse. While this facilitates a global exchange of ideas, I sometimes ponder if the sheer volume of digital connectivity has inadvertently diluted the profound intimacy of face-to-face engagements.",
          "Well, social media has revolutionized how we curate and share our personal narratives, allowing us to maintain interpersonal connections across vast geographical expanses. However, I'm wary of the potential for digital platforms to foster a sense of performative interaction that can occasionally feel less authentic than traditional socialization.",
          "Actually, I believe digital tools have redefined professional collaboration, making it far more dynamic and decentralized than in previous decades. The ability to synchronize efforts across time zones in real-time has fundamentally elevated our collective capacity for innovation and problem-solving."
          ]
        }
      },
      { 
        text: "Do you think we are becoming too dependent on smart devices? Why?", 
        structure: "opinion → reason 1 → reason 2 → conclusion",
        tips: ["Mention the risk of losing basic skills", "Talk about the impact on social interactions"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe we are indeed becoming overly dependent on our devices, often to the detriment of our fundamental cognitive skills. Many individuals struggle with basic spatial navigation or information recall without digital assistance, suggesting a degree of cognitive atrophy that we must proactively address.",
          "To be perfectly honest, I view this dependency as a complex double-edged sword. While smart devices undoubtedly augment our daily efficiency, the constant bombardment of notifications can lead to fragmented attention spans and a significant reduction in our capacity for sustained deep focus.",
          "In my estimation, our reliance on technology is a natural stage in our socio-technical evolution, allowing us to outsource mundane cognitive tasks to focus on more complex creative endeavors. However, we must remain vigilant to ensure that these tools enhance rather than diminish our capacity for genuine human connection."
          ]
        }
      }
    ]
  },
  {
    id: 12,
    phase: 2,
    title: "Money & Banking",
    description: "Discuss spending habits, saving, and financial goals.",
    keywords: [
      { word: "monthly budget", vietnamese: "ngân sách hàng tháng", example: "I make a monthly budget to control my expenses." },
      { word: "save for a rainy day", vietnamese: "tiết kiệm cho lúc khó khăn", example: "It's important to save money for a rainy day because unexpected expenses happen." },
      { word: "financial goals", vietnamese: "mục tiêu tài chính", example: "Buying a new laptop is one of my main financial goals this year." }
    ],
    questions: [
      { 
        text: "Are you a person who likes to save money or spend it?", 
        structure: "saver or spender → reason → habit",
        tips: ["Be honest about your habits", "Mention financial security or future goals"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I would characterize myself as a meticulous 'saver,' as I derive a profound sense of security from maintaining a robust financial buffer. I view capital not merely as a means for consumption, but as a strategic tool for future flexibility and long-term self-determination.",
          "To be perfectly honest, I tend to prioritize 'experiential spending' on pursuits like travel and culinary exploration, as I believe these provide a far more lasting sense of fulfillment than material acquisitions. However, I'm currently focused on refining my financial literacy to ensure a better long-term balance.",
          "I'm somewhere in the middle, adopting a pragmatic approach that prioritizes essential needs while maintaining a dedicated savings plan for future objectives. This balance allows me to enjoy current lifestyle amenities without compromising my long-term financial integrity."
          ]
        }
      },
      { 
        text: "What are some practical tips for saving money in a big city?", 
        structure: "tip 1 → tip 2 → potential impact",
        tips: ["Mention public transport or home-cooked meals", "Talk about tracking expenses with apps"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "One of the most efficacious strategies for wealth preservation in a high-cost urban environment is the adoption of a 'conscious consumption' lifestyle. This involves prioritizing multi-functional, high-quality assets over disposable goods and utilizing sophisticated fintech applications to optimize every facet of one's expenditure.",
          "Well, I find that proactive meal planning and prioritizing home-prepared meals significantly mitigates the high costs of urban living. Constant dining out can be a significant drain on one's resources, so I reserve restaurant visits for truly special occasions to maintain fiscal discipline.",
          "Actually, I've found that utilizing automated savings tools and budget-tracking platforms has been a transformative habit. It provides a granular view of my financial trajectory and allows me to identify and eliminate superfluous expenses that I would otherwise overlook."
          ]
        }
      },
      { 
        text: "In your opinion, is it more important to earn a high salary or have a job you love?", 
        structure: "choice → reason 1 → reason 2 → conclusion",
        tips: ["Talk about financial stability vs. personal fulfillment", "Mention the impact on mental health"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe that having a vocation that aligns with one's personal values and passions is far more important for long-term psychological resilience and life satisfaction. When one is genuinely engaged with their work, the motivation for excellence becomes inherent, leading to a much more sustainable and fulfilling professional trajectory.",
          "To be perfectly honest, I believe a competitive salary is essential for foundational financial stability and the ability to support one's family responsibilities. However, I also recognize that a high income cannot compensate for a persistent lack of meaning or engagement in one's professional life.",
          "Actually, I think a balance between the two is ideal. You need enough income to live comfortably and save for the future, but you also need to find meaning in your work to stay engaged and maintain a positive attitude."
          ]
        }
      }
    ]
  },
  {
    id: 13,
    phase: 2,
    title: "Music & Entertainment",
    description: "Share your preferences in music, movies, and hobbies.",
    keywords: [
      { word: "a huge fan of", vietnamese: "người rất hâm mộ cái gì", example: "I am a huge fan of pop music because it is easy to listen to." },
      { word: "unwind", vietnamese: "nghỉ ngơi, thư giãn", example: "Listening to music helps me unwind after a long day at work." },
      { word: "binge-watch", vietnamese: "xem liên tục (nhiều tập phim)", example: "On weekends, I sometimes binge-watch my favorite series on Netflix." }
    ],
    questions: [
      { 
        text: "What kind of music are you a huge fan of?", 
        structure: "genre → why you like it → favorite artist",
        tips: ["Mention a specific genre (Jazz, Pop, Indie)", "Explain the emotional impact"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm a fervent admirer of avant-garde jazz and atmospheric lo-fi, as I find the harmonic complexity and the improvisational nature of these genres to be exceptionally intellectually stimulating. These sounds often serve as the perfect auditory backdrop for my most focused periods of creative work.",
          "Actually, I'm profoundly moved by the emotional depth and structural grandeur of classical music. I find that the intricate arrangements of the great masters provide a unique sense of catharsis and intellectual stimulation that remains unmatched by more contemporary genres.",
          "I'm consistently drawn to indie-folk and lyrical singer-songwriter pieces, as I find the focus on storytelling and raw, authentic emotion to be particularly resonant. There's a particular intimacy in these acoustic arrangements that I find incredibly compelling."
          ]
        }
      },
      { 
        text: "Do you prefer listening to music alone or at a live concert?", 
        structure: "preference → reason 1 → reason 2",
        tips: ["Talk about the intimacy of listening alone vs. the energy of a crowd", "Mention the sound quality"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I fundamentally prefer the intimacy and auditory precision afforded by high-fidelity headphones within a tranquil domestic setting. Solo listening allows for a far more profound and introspective engagement with the artist's lyrical depth and subtle production nuances that might otherwise be obscured.",
          "To be perfectly frank, nothing truly compares to the visceral energy and collective resonance of a live performance. The sheer physical power of the sound and the shared enthusiasm of a crowd create a unique sensory experience that is far more impactful than any studio recording.",
          "Actually, I believe both offer distinct and valuable experiences. I utilize solo listening for focused study or introspection, but I seek out live concerts for the communal energy and the opportunity to witness an artist's raw, unfiltered performance in real-time."
          ]
        }
      },
      { 
        text: "What influence does music have on our mood and daily life?", 
        structure: "impact on mood → example → social benefit",
        tips: ["Mention how music helps you cope with stress", "Talk about music as a universal language"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Music possesses an unparalleled capacity to modulate our psychological states and serve as a powerful tool for emotional regulation and cognitive stimulation. Beyond its individual impact, it functions as a global lingua franca, transcending cultural and linguistic barriers to foster a deep-seated sense of shared human experience.",
          "Well, I believe the presence of music in our daily lives acts as a powerful catalyst for memory and emotional association. It has the unique ability to anchor moments in time and provide a rhythmic structure to our daily routines, enhancing both our productivity and our emotional well-being.",
          "Actually, music is an essential component of my daily life, as it allows me to curate specific atmospheric settings for different cognitive tasks. I utilize meticulously designed ambient playlists for deep work and high-tempo arrangements for my physical training to optimize my performance."
          ]
        }
      }
    ]
  },
  {
    id: 14,
    phase: 2,
    title: "Transportation & Travel",
    description: "Discuss daily commutes and your favorite ways to travel.",
    keywords: [
      { word: "daily commute", vietnamese: "quãng đường đi làm hàng ngày", example: "I usually listen to podcasts during my daily commute." },
      { word: "rush hour", vietnamese: "giờ cao điểm", example: "I try to leave home early to avoid the rush hour." },
      { word: "get stuck in traffic", vietnamese: "bị kẹt xe", example: "I often get stuck in traffic on my way to the office." }
    ],
    questions: [
      { 
        text: "How do you usually go to work or school?", 
        structure: "vehicle → why you choose it → duration",
        tips: ["Mention the convenience or cost", "Comapre it to other options"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My primary mode of transit is the motorbike, which I find to be the most viable solution for navigating the intricate and often congested urban topography of my city. The agility it affords is indispensable for circumventing peak-hour bottlenecks and ensuring my daily schedule remains efficient.",
          "I prioritize the utilization of high-capacity public transportation, specifically the subway network, as it represents the most eco-efficient and reliable means of urban navigation. The commute provides a valuable window for catching up on professional literature or simply decompressing.",
          "Actually, I'm fortunate enough to inhabit a neighborhood that is highly conducive to walking, which I find to be the most healthful and grounded way to initiate my day. The brief ten-minute walk to my destination provides a necessary transition from my domestic to my professional mindset."
          ]
        }
      },
      { 
        text: "What is your favorite travel destination and why do you love it?", 
        structure: "destination → location → reason 1 → reason 2",
        tips: ["Describe the scenery and local culture", "Mention personal experiences"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My most treasured destination is the central mountain resort of Da Lat, where the juxtaposition of rugged terrain and temperate climate creates a truly sublime landscape. It serves as a quintessential sanctuary for anyone seeking to recalibrate their mental faculties away from the tropical heat.",
          "Well, I'm a huge fan of the coastal ancient town of Hoi An, which is globally renowned for its impeccably preserved architectural heritage and vibrant cultural scene. The sheer diversity of its artisanal crafts and culinary traditions makes it an exceptionally rewarding destination for slow exploration.",
          "Actually, I found my recent expedition to Japan to be exceptionally profound, particularly in its seamless integration of ancient cultural paradigms and cutting-edge innovation. The meticulous attention to detail and the profound respect for tradition were truly culturally illuminating."
          ]
        }
      },
      { 
        text: "Do you prefer traveling alone or with a group of friends/family?", 
        structure: "preference → reason 1 → reason 2",
        tips: ["Compare the freedom of solo travel vs. sharing memories", "Mention safety and planning"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm increasingly drawn to the autonomy and profound self-discovery that solo travel facilitates. Navigating unfamiliar environments independently necessitates a high degree of self-reliance and encourages a much more immersive and unfiltered engagement with the local culture.",
          "To be perfectly honest, I prefer the social energy and shared accountability of traveling with a select group of close-knit peers. The shared experience of encountering new horizons fosters a unique bond and the ability to collectively navigate logistical challenges can be immensely rewarding.",
          "Actually, I believe that family-centric travel provides a vital opportunity for reconnection and the creation of lasting familial narratives. We typically plan our itineraries with a focus on shared activities that cater to the diverse interests and energy levels of all family members."
          ]
        }
      }
    ]
  },
  {
    id: 15,
    phase: 2,
    title: "Education & Lifelong Learning",
    description: "Talk about your studies, soft skills, and constant growth.",
    keywords: [
      { word: "lifelong learning", vietnamese: "học tập suốt đời", example: "Lifelong learning helps us stay young and sharp." },
      { word: "hands-on experience", vietnamese: "kinh nghiệm thực tế", example: "I learned a lot from hands-on experience during my internship." },
      { word: "self-study", vietnamese: "tự học", example: "I spend one hour every night on self-study." }
    ],
    questions: [
      { 
        text: "Do you believe in lifelong learning? Why?", 
        structure: "affirmation → reason → benefit",
        tips: ["Mention how the world changes", "Explain personal or professional growth"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm a resolute advocate for the philosophy of lifelong learning, as I believe the rapid pace of technological and social change necessitates a state of perpetual intellectual evolution. Stagnation is simply not an option in our hyper-competitive global landscape; we must consistently refine our paradigms.",
          "Yes, I do. To me, lifelong learning is fundamental for personal fulfillment and the maintenance of cognitive longevity. It empowers us to explore new intellectual horizons and provides a much-needed sense of purpose and discovery throughout our lives.",
          "I absolutely agree. In the modern workplace, a growth mindset is indispensable for adaptability and resilient problem-solving. Those who embrace continuous learning are far better equipped to navigate the unforeseen challenges of their professional trajectories."
          ]
        }
      },
      { 
        text: "What is a skill you've learned through self-study recently?", 
        structure: "skill name → method → result",
        tips: ["Mention online courses or YouTube tutorials", "Talk about the satisfaction of autonomous learning"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Recently, I've dedicated a significant portion of my cognitive energy to mastering advanced video production techniques through a combination of rigorous self-directed study and practical application. This endeavor has not only enhanced my professional output but has also refined my ability to synthesize complex information and communicate it with greater clarity and persuasive power.",
          "Well, I've recently become quite enamored with learning the intricacies of Mandarin through a variety of high-level digital platforms. I dedicate a focused thirty minutes each evening to mastering complex character structures and tonal nuances, a pursuit that I find both intellectually stimulating and profoundly rewarding.",
          "Actually, I've recently completed a graduate-level certification in data analytics to bolster my professional versatility. The experience of engaging with high-stakes, real-world datasets was exceptionally illuminating and has already empowered me to navigate my current professional responsibilities with a much higher degree of analytical precision."
          ]
        }
      },
      { 
        text: "How do you think the education system could be improved for future generations?", 
        structure: "opinion → area of improvement → vision",
        tips: ["Talk about focusing more on soft skills", "Mention the integration of AI or hands-on projects"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm firmly of the opinion that our educational paradigms must undergo a systemic shift towards prioritizing critical thinking and emotional intelligence over rote memorization. In an era characterized by an overabundance of information, the ability to discern, analyze, and communicate complex ideas with empathy is the ultimate prerequisite for long-term professional success.",
          "To be perfectly frank, I believe that the integration of project-based, experiential learning is indispensable for preparing the next generation for the complexities of the modern workforce. By confronting real-world challenges in a collaborative environment, students can develop the degree of adaptability and resilient problem-solving required to thrive in a rapidly evolving economy.",
          "Actually, I'd strongly advocate for a more personalized pedagogical approach that leverages Artificial Intelligence to cater to the unique cognitive profiles and developmental trajectories of each student. This would facilitate a far more equitable and efficient learning environment, ensuring that every individual has the opportunity to realize their full intellectual potential."
          ]
        }
      }
    ]
  },
  {
    id: 16,
    phase: 2,
    title: "Art and Museums",
    description: "Vocabulary for art galleries, exhibitions, and aesthetics.",
    keywords: [
      { word: "exhibition", vietnamese: "cuộc triển lãm", example: "There is a new photography exhibition opening this weekend." },
      { word: "breathtaking", vietnamese: "đẹp đến nghẹt thở", example: "The colors in that landscape painting are simply breathtaking." },
      { word: "inspired", vietnamese: "được truyền cảm hứng", example: "I felt very inspired after seeing the artist's hard work." }
    ],
    questions: [
      { 
        text: "Do you enjoy visiting art museums or galleries?", 
        structure: "Yes/No → frequency → why",
        tips: ["Mention the atmosphere", "Explain if you find it relaxing or educational"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm a fervent advocate for frequenting art galleries, as I find the serene, almost sacrosanct atmosphere to be exceptionally conducive to introspection. Engaging with diverse visual narratives provides a necessary intellectual reprieve from the relentless digital noise of modern life, allowing me to reconnect with my own creative sensibilities.",
          "To be perfectly honest, my engagement with art is somewhat episodic, typically peaking during visits to major international exhibitions. I'm particularly drawn to contemporary installations that utilize unconventional media to challenge our traditional paradigms of aesthetics and human interaction.",
          "Actually, I maintain a regular practice of visiting historical art museums to gain a more nuanced understanding of our collective cultural evolution. There's a particular intellectual satisfaction in dissecting how the masterpieces of the past were shaped by the complex socio-political dynamics of their respective eras."
          ]
        }
      },
      { 
        text: "Why do you think art is important for society?", 
        structure: "reason 1 → reason 2 → cultural value",
        tips: ["Talk about empathy and self-expression", "Mention art as a reflection of history"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe art serves as a vital cultural repository, encapsulating the complex inquiries and emotional trajectories of its era. It essentially acts as a medium for profound human empathy, allowing us to transcend cultural and linguistic barriers and inhabit the subjective experiences of others.",
          "Well, art functions as an essential mirror to society and its historical evolution, capturing the struggles and triumphs of past generations with a degree of internal depth that words alone can rarely replicate. It provides an invaluable sense of historical continuity and cultural identity.",
          "Actually, I'm of the opinion that art is the ultimate catalyst for innovative thinking across all human disciplines. By encouraging us to view the world through a more imaginative and non-linear lens, it fosters a degree of creative problem-solving that is indispensable for addressing our most complex modern challenges."
          ]
        }
      },
      { 
        text: "If you could own one famous piece of art, which one would it be?", 
        structure: "piece name → artist → why",
        tips: ["Talk about the feelings it evokes", "Mention the technique or the story behind it"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "If I were granted the opportunity to own a single masterpiece, I would undoubtedly prioritize Van Gogh's 'The Starry Night.' Its visceral, swirling brushwork and the raw emotional intensity it conveys are a testament to the artist's unique psychological perspective and remains a profound influence on my own aesthetic sensibilities.",
          "To be perfectly frank, I've always harbored a fascination for Hokusai's 'The Great Wave off Kanagawa.' The sublime interplay between the raw power of nature and the delicate, precarious nature of human endeavor represents a potent and timeless metaphor for resilience in the face of overwhelming odds.",
          "Actually, I'd strongly favor a significant contemporary sculpture that challenges our traditional perceptions of space and physicality. I find the thought-provoking nature of modern three-dimensional art to be exceptionally intellectually stimulating and a perfect catalyst for profound interior dialogue."
          ]
        }
      }
    ]
  },
  {
    id: 17,
    phase: 2,
    title: "Safety and Security",
    description: "Discuss measures to keep yourself and your data safe.",
    keywords: [
      { word: "take precautions", vietnamese: "thực hiện phòng ngừa", example: "You should take precautions like locking your doors." },
      { word: "identity theft", vietnamese: "đánh cắp danh tính", example: "Using strong passwords helps prevent identity theft." },
      { word: "emergency", vietnamese: "tình huống khẩn cấp", example: "In case of an emergency, stay calm and call for help." }
    ],
    questions: [
      { 
        text: "What do you do to keep your home safe?", 
        structure: "method → action → benefit",
        tips: ["Mention security systems or simple habits", "Explain the peace of mind it brings"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "To ensure the sanctity of my domestic environment, I've implemented a multi-layered security strategy that integrates sophisticated smart-monitoring systems with robust physical deterrents. The peace of mind derived from knowing that my personal space is rigorously protected is indispensable for my overall psychological equilibrium.",
          "I rely primarily on a policy of active communal vigilance, participating in a close-knit neighborhood watch program where residents maintain a high degree of mutual accountability. This collective approach to safety fosters a profound sense of security and shared responsibility within my local community.",
          "Actually, I'm of the opinion that simple, disciplined habits are the most efficacious form of protection. My routine involves a meticulously structured checklist for securing my residence and ensuring that all potential fire hazards are mitigated before I retire for the evening or embark on travel."
          ]
        }
      },
      { 
        text: "How do you protect your personal information online?", 
        structure: "action → tool → goal",
        tips: ["Mention strong passwords and two-factor authentication", "Talk about being cautious on public Wi-Fi"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In the digital realm, I adhere to a stringent protocol involving the utilization of a high-level password management system and the ubiquitous activation of multi-factor authentication across all sensitive platforms. I view these measures as essential safeguards against the escalating threat of sophisticated cyber-attacks.",
          "Well, I maintain a high degree of skepticism regarding unsolicited digital communications and avoid sharing sensitive personal information on social media to minimize my digital footprint. Additionally, I utilize a robust VPN in public Wi-Fi environments to ensure that my data stays encrypted and anonymous.",
          "Actually, I maintain a regular schedule for auditing my digital privacy settings and ensuring that permissions are strictly limited to necessary interactions. Remaining proactive and informed about the latest cybersecurity trends is a non-negotiable component of my professional and personal life."
          ]
        }
      },
      { 
        text: "What should people do to stay safe when traveling to a new city?", 
        structure: "precaution 1 → precaution 2 → outcome",
        tips: ["Talk about researching the area and keeping valuables secure", "Mention staying aware of surroundings"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Prudent travelers should prioritize a policy of 'meticulous situational awareness,' which involves conducting thorough preliminary research on local safety indices and maintaining a low-profile demeanor. It's essential to strike a balance between open-minded exploration and the necessary vigilance required for navigation.",
          "To be perfectly honest, I believe that maintaining a highly secure and discreet method for managing one's financial assets and identification is paramount in unfamiliar urban centers. I also make it a habit to communicate my detailed itinerary and real-time location to a trusted contact throughout my journey.",
          "Actually, the most effective way to ensure one's safety is to blend in as much as possible with the local population and adhere strictly to established cultural norms. Should an ambiguous situation arise, I've found that seeking assistance from clearly identified authorities is far more prudent than relying on unsolicited guidance."
          ]
        }
      }
    ]
  },
  {
    id: 18,
    phase: 2,
    title: "Volunteering and Helping Others",
    description: "Share your experiences in community service.",
    keywords: [
      { word: "give back", vietnamese: "đóng góp lại (cho xã hội)", example: "Volunteering is a great way to give back to the community." },
      { word: "make a difference", vietnamese: "tạo ra sự khác biệt", example: "Even small actions can make a difference in someone's life." },
      { word: "meaningful", vietnamese: "đầy ý nghĩa", example: "Teaching English to children was a very meaningful experience." }
    ],
    questions: [
      { 
        text: "Why do you think people choose to give back to their community?", 
        structure: "reason → benefit → opinion",
        tips: ["Mention empathy or social responsibility", "Talk about personal satisfaction"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe that the impulse to give back stems from a profound recognition of our shared social responsibility and an inherent need for collective altruism. Engaging in community service not only addresses systemic vulnerabilities but also fosters a deep sense of civic pride and personal fulfillment.",
          "One primary motivation is the power of volunteering to strengthen intra-community bonds and create a more resilient social fabric. By investing our time in the well-being of others, we effectively build a far more supportive and empathetic environment for everyone, ourselves included.",
          "Actually, many individuals find that the act of giving acts as a powerful catalyst for personal growth, providing a much-needed perspective and the opportunity to develop invaluable interpersonal skills. It's a mutually beneficial interaction that enriches both the benefactor and the community at large."
          ]
        }
      },
      { 
        text: "Have you ever participated in a volunteering project? What did you do?", 
        structure: "event → tasks → takeaway",
        tips: ["Mention a specific organization or activity", "Talk about the impact it had on you"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I dedicated a substantial portion of last summer to a rigorous volunteering project at a local animal refuge, where I was primarily tasked with the physical rehabilitation and social integration of neglected pets. This experience was exceptionally poignant, instilling in me a more nuanced understanding of dedicated stewardship.",
          "Well, I was recently involved in a highly coordinated coastal restoration project organized by a prominent domestic NGO. We were tasked with the systematic removal of hazardous marine debris and the reforestation of local mangroves, an experience that profoundly heightened my awareness of our ecological fragility.",
          "Actually, I've spent the past two years spearheading a digital literacy initiative for underprivileged youth in rural districts. Witnessing their rapid intellectual development and burgeoning confidence has been the most professionally and personally rewarding trajectory of my life thus far."
          ]
        }
      },
      { 
        text: "How can small acts of kindness improve a community?", 
        structure: "example action → direct effect → ripple effect",
        tips: ["Talk about smiling at strangers or helping a neighbor", "Mention building trust and positivity"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Small, individual acts of kindness function as the essential connective tissue of a healthy community, initiating a positive feedback loop that can lead to significant cultural shifts. For example, assisting a neighbor with groceries can foster a degree of mutual trust that revitalizes local social dynamics.",
          "To be perfectly honest, taking a moment to offer genuine, empathetic listening to a colleague in distress can have a profoundly transformative impact on their professional well-being. It signals that they belong to a supportive ecosystem, which in turn bolsters our collective morale and resilience.",
          "Actually, cumulative modest gestures, such as the regular maintenance of communal spaces or the donation of gently-used assets, can lead to a far more sustainable and supportive environment. It demonstrates a shared commitment to our collective well-being and a collective stewardship of our community's future."
          ]
        }
      }
    ]
  },
  {
    id: 19,
    phase: 2,
    title: "Expressing Opinions on Current Issues",
    description: "Learn to discuss controversial topics like AI or climate change.",
    keywords: [
      { word: "controversial", vietnamese: "gây tranh cãi", example: "The use of AI in art is a very controversial topic." },
      { word: "pros and cons", vietnamese: "ưu và nhược điểm", example: "We should consider the pros and cons of working from home." },
      { word: "global warming", vietnamese: "sự nóng lên toàn cầu", example: "Global warming is causing extreme weather around the world." }
    ],
    questions: [
      { 
        text: "Do you think Artificial Intelligence is a threat or a useful tool?", 
        structure: "choice → why → example",
        tips: ["Consider both sides", "Mention a specific application (healthcare, education)"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In my estimation, Artificial Intelligence represents a paradigm-shifting innovation that, if navigated with rigorous ethical oversight, could fundamentally elevate our global problem-solving capabilities. Its potential to revolutionize fields like preventative medicine and personalized pedagogy is truly unparalleled.",
          "To be perfectly honest, I view AI as a double-edged sword that necessitates a highly nuanced regulatory framework. While it offers unprecedented gains in productivity, we must remain vigilant regarding its potential to exacerbate economic disparities and its inherent risk to individual privacy and intellectual property.",
          "In my opinion, the proliferation of AI is an inevitable socio-technical evolution that will transform every facet of our lives for the better, provided we prioritize human-centric design. It makes our daily lives more convenient and opens up new, hitherto unexplored frontiers for creative and scientific innovation."
          ]
        }
      },
      { 
        text: "How can individuals contribute to solving the problem of global warming?", 
        structure: "action 1 → action 2 → long-term benefit",
        tips: ["Mention reducing energy consumption or plastic use", "Talk about supporting sustainable brands"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Individual agency plays a pivotal role in the global response to the climate crisis, primarily through the adoption of more conscious consumption habits and the active support of circular economy initiatives. These cumulative individual actions are the essential catalyst for the broader systemic changes required for ecological restoration.",
          "To be perfectly honest, prioritizing the reduction of one's personal carbon footprint through the utilization of renewable energy and the minimization of waste is the most significant contribution an individual can make. We can also drive broader change by favoring businesses that demonstrate a genuine commitment to sustainability.",
          "Actually, I believe that fostering a more profound ecological literacy within our local communities is a fundamental prerequisite for long-term solution. When individuals truly grasp the systemic nature of global warming, they are far more likely to integrate and advocate for sustainable lifestyles as a non-negotiable norm."
          ]
        }
      },
      { 
        text: "What are the pros and cons of working remotely compared to an office environment?", 
        structure: "pros → cons → preference",
        tips: ["Mention the flexibility and lack of commute vs. potential isolation", "Talk about productivity differences"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "The transition towards remote work has been a double-edged sword, offering unprecedented flexibility and a necessary reduction in urban infrastructure stress, while simultaneously challenging our traditional paradigms of professional boundaries. It provides a much-needed boost to our work-life balance and personal autonomy.",
          "Well, the traditional office environment remains a vital catalyst for spontaneous collaborative synergy and the maintenance of a strong, cohesive organizational culture. However, the associated costs in terms of commute-induced exhaustion and the lack of focused solitude can occasionally impede personal productivity.",
          "Actually, I believe that a hybrid model represents the most viable path forward, synthesizing the autonomy of remote work with the creative dynamism found in face-to-face environments. This approach respects individual need for flexibility while ensuring that the benefits of communal interaction are not lost."
          ]
        }
      }
    ]
  },
  {
    id: 20,
    phase: 2,
    title: "Future Plans and Aspirations",
    description: "Discuss your long-term goals and career moves.",
    keywords: [
      { word: "long-term goal", vietnamese: "mục tiêu dài hạn", example: "My long-term goal is to become a senior developer." },
      { word: "aspiration", vietnamese: "nguyện vọng", example: "She has a strong aspiration to travel around the world." },
      { word: "settle down", vietnamese: "ổn định cuộc sống", example: "I want to travel for a few more years before I settle down." }
    ],
    questions: [
      { 
        text: "What kind of person do you strive to become in the next 5 years?", 
        structure: "role → skills → vision",
        tips: ["Mention professional and personal traits", "Talk about the impact you want to have"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In the next five years, I hope to have evolved into a highly knowledgeable and confident leader within my chosen field. I plan to meticulously refine my communication and management frameworks so I can inspire a team to achieve unprecedented results through collective innovation.",
          "I strive to become a more intellectually independent and culturally versatile individual. My vision is to establish myself as a successful digital nomad, a role that will allow me to explore diverse global paradigms while maintaining a high level of professional output.",
          "Actually, I aspire to be someone who significantly elevates the quality of life in my community. I'm aiming to reach a level of financial autonomy that allows me to dedicate my leisure time to large-scale environmental restoration projects."
          ]
        }
      },
      { 
        text: "What is a major aspiration you hope to achieve in the next decade?", 
        structure: "aspiration → why it's important → key milestone",
        tips: ["Mention a long-term goal like starting a family or a business", "Talk about personal legacy"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My primary long-term objective is to attain a position of strategic leadership within a global non-profit organization dedicated to educational equity. I believe my background in project management, coupled with a growing expertise in international policy, will empower me to contribute meaningfully to large-scale systemic change.",
          "Well, I've harbored an intense aspiration to eventually author a collection of sociological essays that explore the impact of digital integration on intergenerational communication. I'm currently dedicating my leisure time to meticulous research and the refinement of my analytical framework, with the intention of completing a first draft soon.",
          "Actually, I'm currently focused on achieving a high degree of financial self-sufficiency through a carefully curated investment portfolio. This would grant me the ultimate autonomy to pursue creative and community-centric projects that I find deeply personally fulfilling, rather than mere professional obligations."
          ]
        }
      },
      { 
        text: "How do you plan to balance your career goals with your personal life?", 
        structure: "strategy → specific habit → goal",
        tips: ["Mention setting boundaries and prioritizing self-care", "Talk about the importance of family time"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I plan to implement a highly disciplined boundary between my professional and personal spheres, ensuring that digital work notifications do not encroach upon my domestic tranquility. This will allow for a far more profound and focused engagement with my creative pursuits and familial responsibilities.",
          "Well, I'm prioritizing my psychological and physical resilience by integration of a rigorous daily exercise and meditation protocol into my weekly schedule. While professional excellence is a primary goal, I'm firmly of the belief that a healthy mind and body are the fundamental prerequisites for long-term fulfillment.",
          "Actually, I believe that achieving a harmonious work-life equilibrium is the most accurate metric of success in the modern era. I'm actively pursuing professional opportunities that offer a high degree of flexibility, allowing me to be more present for my family while still maintaining a peak level of professional engagement."
          ]
        }
      }
    ]
  },
  {
    id: 21,
    phase: 3,
    title: "Environmental Issues",
    description: "Discuss plastic use, sustainability, and protecting our planet.",
    keywords: [
      { word: "sustainability", vietnamese: "sự bền vững", example: "We need to focus on sustainability to protect the environment for future generations." },
      { word: "eco-friendly", vietnamese: "thân thiện với môi trường", example: "I try to buy eco-friendly products whenever possible." },
      { word: "reduce waste", vietnamese: "giảm thiểu rác thải", example: "Using a reusable water bottle is a simple way to reduce waste." }
    ],
    questions: [
      { 
        text: "What are some simple ways we can help protect the environment in our daily lives?", 
        structure: "simple action → benefit → broader impact",
        tips: ["Mention reducing plastic use", "Talk about energy saving habits"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "One of the most efficacious ways to mitigate our collective ecological impact is the adoption of a 'zero-waste' philosophy in our daily lives. By prioritizing high-quality, reusable assets and minimizing single-use plastics, we can significantly reduce the volume of debris that enters our fragile marine ecosystems.",
          "I believe we can orchestrate a profound environmental impact by cultivating a more rigorous consciousness regarding our domestic energy consumption patterns. These cumulative individual habit shifts are the essential catalyst for reducing our global carbon footprint and effectively addressing the climate crisis.",
          "Actually, prioritizing the support of local, eco-certified brands is another exceptionally effective strategy for environmental stewardship. It fosters a more sustainable local economy and significantly reduces the environmental degradation associated with globalized industrial logistics."
          ]
        }
      },
      { 
        text: "How can businesses be more sustainable in their operations?", 
        structure: "strategy → impact → consumer benefit",
        tips: ["Mention reducing packaging or waste", "Talk about using renewable energy sources"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Businesses have a critical responsibility to integrate sustainability into their core operational frameworks, primarily by optimizing their supply chains for carbon neutrality and utilizing ethically sourced, biodegradable materials. Such a commitment not only safeguards the environment but also enhances brand integrity in an increasingly eco-conscious global market.",
          "Well, I believe that a significant investment in renewable energy infrastructure, such as integrated solar or wind power, represents a highly strategic long-term move for any modern enterprise. It not only reduces their ecological footprint but also insulates the organization against the volatility of traditional energy markets.",
          "Actually, companies should adopt a more holistic approach by ensuring that their entire value chain adheres to rigorous ethical and environmental standards. By prioritizing transparency and accountability, businesses can demonstrate a genuine commitment to social and ecological responsibility."
          ]
        }
      },
      { 
        text: "In your opinion, what is the biggest environmental threat we face today?", 
        structure: "identify threat → reason → potential consequence",
        tips: ["Mention climate change or plastic pollution", "Talk about biodiversity loss"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In my estimation, the most existential threat we face is the accelerated loss of global biodiversity, which undermines the very biological systems that sustain human life. This crisis, compounded by the escalating impacts of climate change, necessitates a radical and immediate shift in our collective relationship with the natural world.",
          "To be perfectly honest, the ubiquitous nature of microplastic pollution in our oceans is a massive concern for me, as it's currently disrupting entire marine ecosystems and entering the human food chain with unknown long-term consequences. It's a visible symptom of our broader systemic disregard for ecological limits.",
          "Actually, I believe that the ongoing fragmentation of natural habitats is a critical but often overlooked threat that significantly accelerates species extinction. We must prioritize the protection of large-scale, interconnected ecological corridors before we lose the irreplaceable biological complexity that supports our own survival."
          ]
        }
      }
    ]
  },
  {
    id: 22,
    phase: 3,
    title: "Overcoming Conflict",
    description: "Learn to describe challenges and how you solve problems with others.",
    keywords: [
      { word: "resolve a conflict", vietnamese: "giải quyết xung đột", example: "It's important to stay calm when you try to resolve a conflict." },
      { word: "see eye to eye", vietnamese: "đồng quan điểm", example: "My manager and I don't always see eye to eye on every project." },
      { word: "compromise", vietnamese: "thỏa hiệp", example: "In a team, sometimes you have to compromise to move forward." }
    ],
    questions: [
      { 
        text: "Can you describe a time you had a disagreement with someone and how you handled it?", 
        structure: "situation → action → outcome",
        tips: ["Focus on the solution, not just the problem", "Mention the importance of listening"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I recall a particularly challenging period in my professional life where I encountered a significant strategic disagreement with a senior colleague regarding a project's future trajectory. By initiating a series of transparent, solutions-oriented workshops, I was able to bridge our respective paradigms and reach a comprehensive compromise that satisfied all stakeholders.",
          "I once shared a living space with a peer where our respective definitions of 'communal order' were significantly divergent. To navigate this, I proposed the implementation of a meticulously structured maintenance schedule that clearly defined our mutual responsibilities, a solution that successfully restored residential harmony.",
          "In a previous professional capacity, a significant misunderstanding arose regarding the delegation of critical responsibilities. I took the initiative to formalize our communicative protocols, ensuring that every project objective was clearly defined and accounted for, which led to a much more efficient and collaborative work environment."
          ]
        }
      },
      { 
        text: "How do you handle a situation where you are forced to work with someone you don't like?", 
        structure: "mindset → behavior → objective",
        tips: ["Talk about staying professional", "Mention focusing on the common goal"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In scenarios where interpersonal friction is unavoidable, I prioritize maintaining a strictly professional demeanor and focusing entirely on our shared organizational objectives. I believe that an individual's personal biases should never be allowed to compromise the collective productivity or creative synergy of a high-functioning team.",
          "Well, I mitigate such challenges by focusing on our shared goals and maintaining a high level of interpersonal respect within our professional interactions. By prioritizing objective results over personal differences, I've found that we can still achieve highly innovative and impactful outcomes.",
          "Actually, I view these scenarios as essential opportunities to practice my diplomatic skills and refine my capacity for professional collaboration. By maintaining a high degree of transparency and receptive listening, I can minimize potential friction and ensure that our collective efforts remain focused on achieving our strategic targets."
          ]
        }
      },
      { 
        text: "What are some key skills for effective conflict resolution in the workplace?", 
        structure: "skill 1 → skill 2 → why they matter",
        tips: ["Mention active listening and empathy", "Talk about staying calm under pressure"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe that the capacity for active, non-judgmental listening and a high degree of emotional intelligence are the two most critical skills for effective conflict resolution. By prioritizing the understanding of a colleague's perspective, we can foster a much more resilient and empathetic organizational culture.",
          "To be perfectly honest, maintaining a high level of psychological resilience and composed professionalism under pressure is vital for preventing the escalation of workplace friction. It empowers all involved parties to approach the challenge with a much higher degree of rationality and collaborative intent.",
          "Actually, the implementation of clear, transparent, and respectful communicative protocols is indispensable for the prevention and resolution of misunderstanding. Being able to articulate one's position with precision while remaining open to diverse viewpoints is the hallmark of a truly mature and collaborative professional."
          ]
        }
      }
    ]
  },
  {
    id: 23,
    phase: 3,
    title: "Success and Failure",
    description: "Define what these concepts mean to you and share personal lessons.",
    keywords: [
      { word: "milestone", vietnamese: "cột mốc quan trọng", example: "Graduating from university was a major milestone in my life." },
      { word: "overcome an obstacle", vietnamese: "vượt qua trở ngại", example: "Failure is just an opportunity to learn how to overcome an obstacle." },
      { word: "fulfillment", vietnamese: "sự mãn nguyện/hài lòng", example: "True success brings a sense of inner fulfillment." }
    ],
    questions: [
      { 
        text: "What does 'success' mean to you personally?", 
        structure: "definition → example → feeling",
        tips: ["Avoid just mentioning money", "Focus on personal growth or happiness"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "To me, success is defined by a consistent pursuit of self-actualization and the attainment of a profound sense of inner fulfillment. It transcends traditional metrics like financial accumulation, focusing instead on the tangible impact one has on their community and the continuous expansion of one's own intellectual horizons.",
          "I'm firmly of the belief that true success is characterized by the attainment of the personal milestones we set for ourselves, independent of external expectations. It's the unique satisfaction derived from overcoming a significant obstacle that previously seemed insurmountable through sheer persistence.",
          "In my opinion, the ultimate manifestation of success is achieving a harmonious balance between exceptional professional attainment and a deep-seated personal happiness. Being able to provide a high quality of life for one's family while simultaneously pursuing one's intrinsic passions is my ultimate metric of success."
          ]
        }
      },
      { 
        text: "Tell me about a time you failed at something and what you learned from it?", 
        structure: "event → what went wrong → lesson → current situation",
        tips: ["Be honest and specific", "Show growth and positive changes"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I recall a significant professional setback where I failed to secure a critical client due to a lack of meticulous preparation regarding their specific technical requirements. This experience was exceptionally illuminating, instilling in me a more nuanced understanding of strategic research and the necessity of total preparedness.",
          "Well, I once encountered a significant academic challenge due to a lack of effective time management during a particularly rigorous assessment period. This experience was a critical catalyst for my development of a high-level prioritization framework and a more disciplined approach to my professional and personal life.",
          "Actually, my primary experience with failure involved a modest entrepreneurial venture that did not achieve the sustained success I had anticipated. While it was initially discouraging, the experience provided me with an invaluable education in market dynamics and the profound importance of empathetic customer resonance."
          ]
        }
      },
      { 
        text: "Do you think society's definition of success has changed over time? How?", 
        structure: "past vs present → specific change → impact",
        tips: ["Mention the shift from material wealth to well-being", "Talk about the influence of social media"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I believe our societal perception of success is undergoing a necessary evolution, transitioning from a focus on conspicuous material accumulation towards a multi-dimensional appreciation for personal well-being and social impact. Today, the ability to maintain an optimal work-life equilibrium is increasingly viewed as the ultimate hallmark of a successful life.",
          "To be perfectly honest, I believe the pervasive influence of digital media has occasionally skewed our perceptions of success, fostering an environment where curated luxury can be mistakenly prioritized over genuine professional attainment. This necessitates a high degree of critical literacy and an unwavering commitment to one's own internal values.",
          "Actually, I'm observing a powerful shift where success is increasingly defined by the positive, systemic impact an individual has on their community and the environment. This represents a more enlightened and sustainable paradigm that aligns our personal professional goals with the broader well-being of the planet."
          ]
        }
      }
    ]
  },
  {
    id: 24,
    phase: 3,
    title: "Manners and Customs",
    description: "Talk about cultural traditions and social etiquette in your country.",
    keywords: [
      { word: "etiquette", vietnamese: "phép lịch sự/quy tắc ứng xử", example: "Dining etiquette varies significantly from culture to culture." },
      { word: "customary", vietnamese: "theo phong tục", example: "It is customary to take off your shoes before entering a Vietnamese home." },
      { word: "show respect", vietnamese: "thể hiện sự tôn trọng", example: "Using both hands when giving a gift is a way to show respect." }
    ],
    questions: [
      { 
        text: "What is an important piece of social etiquette in your culture?", 
        structure: "describe custom → when/where → why it's important",
        tips: ["Choose one clear example (greeting, dining)", "Explain the underlying value (respect, hospitality)"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In my culture, the use of nuanced honorifics to demonstrate respect for elders is a fundamental pillar of our social etiquette, reflecting our deep-seated ancestral traditions and the value we place on historical wisdom. This practice is essential for maintaining social cohesion and fostering a sense of intergenerational continuity.",
          "It's a foundational custom in my country to meticulously remove one's footwear before entering a domestic residence, a practice that signifies far more than mere cleanliness. It's a non-verbal demonstration of cultural humility and a sign of profound respect for the host's private environment.",
          "During a traditional meal, it's a critical component of our dining etiquette to defer to the eldest individual, who initiates the dining process. This modest gesture is an essential manifestation of our cultural emphasis on filial piety and the importance of maintaining an orderly and respectful familial dynamic."
          ]
        }
      },
      { 
        text: "How should a visitor behave when they are invited to a traditional event in your country?", 
        structure: "etiquette 1 → etiquette 2 → goal",
        tips: ["Mention dress code and bringing a small gift", "Talk about participating in local customs"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "A visitor to a traditional event should prioritize a high degree of cultural sensitivity by adhering to modest local dress codes and providing a small, thoughtful token of appreciation, such as artisanal sweets, for the host. Participating in local rituals with an open and respectful mind is the ultimate demonstration of cultural humilty.",
          "To be perfectly honest, it is imperative to follow the host's lead during complex traditional ceremonies to ensure that one's presence is a source of respect rather than distraction. For example, waiting for a formal invitation to be seated demonstrates a high level of gratitude for the host's hospitality.",
          "Actually, I believe that demonstrating a genuine, sincere interest in the cultural significance of the event is the most effective way for a visitor to build rapport. Asking respectful, insightful questions and meticulously following local social codes will facilitate a far more immersive and meaningful cultural exchange."
          ]
        }
      },
      { 
        text: "What are some common cultural misunderstandings that travelers might encounter?", 
        structure: "example 1 → example 2 → lesson",
        tips: ["Mention hand gestures or personal space", "Talk about the importance of prior research"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "One frequent cultural misunderstanding stems from the divergent interpretations of non-verbal cues and hand gestures across various international contexts. To mitigate potential offense, I maintain a regular practice of conducting thorough preliminary research on the social codes of any new region I intend to explore.",
          "Well, expectations regarding interpersonal distance and physical contact vary significantly, and what is considered an amiable gesture in one culture might be perceived as uncomfortably intrusive in another. Cultivating a refined sense of observation and cultural empathy is vital for navigating these invisible boundaries.",
          "Actually, profound misunderstandings can also occur regarding dining traditions, such as the implications of finishing every item on your plate or the nuanced etiquette of gratuities. These modest differences highlight the absolute necessity for constant cultural literacy and a high degree of intellectual openness when traveling."
          ]
        }
      }
    ]
  },
  {
    id: 25,
    phase: 3,
    title: "Childhood Memories",
    description: "Reflect on your early years and the lessons you learned.",
    keywords: [
      { word: "nostalgic", vietnamese: "hoài niệm", example: "Looking at old family photos always makes me feel nostalgic." },
      { word: "upbringing", vietnamese: "sự nuôi dưỡng/giáo dục", example: "My upbringing in a rural area taught me to appreciate nature." },
      { word: "childhood friend", vietnamese: "bạn thuở nhỏ", example: "I am still in touch with my best childhood friend." }
    ],
    questions: [
      { 
        text: "What is your most vivid childhood memory?", 
        structure: "event → age → sensory details → feeling",
        tips: ["Describe what you saw, heard, or smelled", "Explain why it stayed with you"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I harbor a particularly poignant and vivid memory of flying kites with my grandfather during the golden hours of my early childhood. The sensory details—the scent of fresh grass and the primal feeling of absolute freedom—evoke a sense of nostalgia that continues to ground me in my most stressful adult moments.",
          "My most cherished childhood memory is the series of annual familial pilgrimages we made to the coast, where my siblings and I would spend entire days engaged in elaborate sandcastle construction. These experiences were the primary architects of my current value system, which prioritizes strong, cohesive familial bonds.",
          "I maintain a remarkably clear memory of the sensory overload on my very first day of primary school, characterized by a potent mix of nervous anticipation and intense curiosity. Looking back, that was the initial step of a profound intellectual journey that continues to define my identity today."
          ]
        }
      },
      { 
        text: "How has your upbringing influenced the person you are today?", 
        structure: "value learned → example → current personality",
        tips: ["Mention the environment you grew up in (rural/urban)", "Talk about the influence of your parents or teachers"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "My upbringing in a close-knit, rural community has been the primary architect of my current values, instilling in me a profound respect for agricultural cycles and a resilient, character-driven mindset. This foundation has been instrumental in my ability to navigate the complexities of urban life with a baseline of authenticity.",
          "Well, my parents consistently prioritized the twin values of rigorous intellectual inquiry and profound empathy toward our fellow citizens. Their unwavering influence has shaped me into a self-aware and highly motivated individual who actively pursues lifelong learning and meaningful community engagement.",
          "Actually, my experience as an only child from a very young age necessitated the development of a high degree of cognitive independence and unconventional creative thinking. This has ultimately empowered me to become a more resilient and innovative problem-solver within both my professional and personal spheres."
          ]
        }
      },
      { 
        text: "What is a lesson from your childhood that you still value as an adult?", 
        structure: "lesson → story → application",
        tips: ["Talk about honesty, perseverance, or curiosity", "Explain how it guides your decisions now"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "A lesson from my early years that I continue to hold as a non-negotiable value is the absolute necessity for radical honesty, especially in highly challenging circumstances. It's a principle that guides my professional interactions, ensuring that my leadership is characterized by integrity and mutual trust.",
          "Well, I first encountered the transformative power of persistent resilience when attempting to master the intricacies of bicycle navigation as a young child. My father's reminder that 'failure is an essential step toward mastery' is a framework that continues to empower me during times of professional setback.",
          "Actually, the most enduring lesson from my early years is the necessity of intellectual curiosity—the constant drive to interrogate the 'why' behind existing systems. This mindset has led me to explore a vast array of interests and consistently expands my cognitive and professional horizons."
          ]
        }
      }
    ]
  },
  {
    id: 26,
    phase: 3,
    title: "Difficult Decisions",
    description: "Share stories about tough choices and how they shaped you.",
    keywords: [
      { word: "at a crossroads", vietnamese: "ở giữa những sự lựa chọn", example: "After graduation, I felt like I was at a crossroads in my career." },
      { word: "weigh the options", vietnamese: "cân nhắc các lựa chọn", example: "I spent weeks weighing the options before deciding to move to a new city." },
      { word: "no regrets", vietnamese: "không hối tiếc", example: "Although it was a tough choice, I have no regrets about my decision." }
    ],
    questions: [
      { 
        text: "Describe a difficult decision you had to make in your life.", 
        structure: "the choice → the struggle → the decision → the outcome",
        tips: ["Be specific about the two options", "Mention the factor that tipped the scale"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I recently navigated a significant professional crossroads, forced to choose between a secure, well-established career trajectory and a high-risk entrepreneurial venture. After a period of meticulous self-reflection and risk assessment, I chose the latter, driven by a deep-seated need for personal autonomy and creative expression.",
          "To be perfectly honest, I recently faced a difficult choice regarding whether to continue my current path or transition into a completely different industry to follow my burgeoning interest in sustainable design. While the decision was initially stressful, moving forward with this new pursuit has been exceptionally fulfilling.",
          "Actually, my most impactful decision was choosing a non-traditional academic major despite significant pressure from family and peers. Standing firm in my decision to prioritize personal passion over social expectations was a hard-won victory that I've never subsequently regretted, as it has led to a highly fulfilling vocation."
          ]
        }
      },
      { 
        text: "Who do you usually turn to for advice when you have a tough choice to make?", 
        structure: "person → why you trust them → how it helps",
        tips: ["Mention a family member, a mentor, or a close friend", "Explain the type of guidance they provide"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "In the face of an ambiguous or especially high-stakes choice, I typically prioritize the counsel of my lifelong mentor, whose wealth of professional experience and objective perspective help to illuminate potential blind spots. Their guidance allows me to navigate complex scenarios with a much higher degree of clarity.",
          "Well, I consistently turn to my senior professional network because of their expansive industry literacy and their ability to provide a strictly objective perspective on my strategic options. These discussions often empower me to make more informed decisions by weighing the long-term impacts with greater precision.",
          "Actually, I prefer to discuss my burgeoning options within a small, diverse group of trusted peers who understand my fundamental values. Their varying perspectives often reveal creative solutions that I might have otherwise overlooked, providing both the empirical data and the emotional support I need to move forward."
          ]
        }
      },
      { 
        text: "How do you handle the fear of making the wrong decision?", 
        structure: "feeling → mindset shift → action",
        tips: ["Talk about focusing on what you can control", "Mention that every choice is an opportunity to learn"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I've learned to mitigate the fear of making sub-optimal choices by embracing a philosophy of 'informed experimentation.' By viewing every decision as an essential data point in a longer-term learning process, I can focus on the strategic rationale rather than being paralyzed by the potential for an imperfect result.",
          "Well, I prioritize gathering a comprehensive body of data and weighing all viable options through a highly rational framework before initiating any major move. Being exceptionally well-informed provides the necessary foundation of confidence that allows me to trust my professional judgment, even in uncertain environments.",
          "Actually, I try to focus entirely on the aspects of the situation that are within my direct control and maintain a total absence of regret once a commitment is made. I'm firmly of the belief that moving forward with total dedication is far more efficacious than remaining at a crossroads, plagued by persistent self-doubt."
          ]
        }
      }
    ]
  },
  {
    id: 27,
    phase: 3,
    title: "Personality Types",
    description: "Discuss being an introvert, extrovert, and understanding yourself.",
    keywords: [
      { word: "introvert / extrovert", vietnamese: "người hướng nội / hướng ngoại", example: "As an introvert, I need some alone time to recharge my batteries." },
      { word: "social butterfly", vietnamese: "người rất thích giao lưu", example: "My sister is a real social butterfly; she loves meeting new people." },
      { word: "self-aware", vietnamese: "hiểu rõ bản thân", example: "Being self-aware helps you choose the right career path." }
    ],
    questions: [
      { 
        text: "Would you describe yourself as more of an introvert or an extrovert? Why?", 
        structure: "identify → behavior example → how you feel in groups",
        tips: ["Explain how you recharge energy (alone or with others)", "Mention that you can be a mix of both"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I characterize myself as a nuanced ambivert, possessing the social fluency to thrive in diverse professional environments while maintaining a profound need for solitary periods of intellectual recalibration. This self-awareness allows me to strategically manage my energy to maintain peak cognitive performance throughout the workweek.",
          "Actually, I'm a real social catalyst and consider myself more of an extrovert, as I find that I'm most intellectually energized when engaged in dynamic group discourse. I find that the rapid-fire exchange of ideas within a diverse group is the most effective catalyst for my own creative and professional motivation.",
          "I believe I occupy a unique space as a highly self-aware ambivert, combining a love for collaborative innovation with a strong need for introspective solitude. Recognizing the subtle shifts in my own energy levels allows me to manage my time with a high degree of efficiency, ensuring that both my social and solitary periods are optimized."
          ]
        }
      },
      { 
        text: "Do you think your personality has changed as you've gotten older? In what way?", 
        structure: "past traits → key event → current personality",
        tips: ["Talk about becoming more confident or patient", "Mention any life experiences that triggered the change"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I've observed a profound evolution in my persona as I've matured, transitioning from a reactive, externally-validated mindset to one characterized by deep self-assurance and emotional resilience. My professional experiences have been instrumental in this development, teaching me to trust my internal compass over the fluctuating opinions of others.",
          "To be perfectly honest, I've become significantly more patient and culturally versatile over the years. My extensive global travels and engagement with diverse intellectual paradigms have broadened my perspective, fostering a degree of empathy and intellectual humility that I previously lacked.",
          "Actually, I find that my priorities have undergone a total shift, moving from a desire for social acceptance to a profound commitment toward achieving my strategic professional goals. I'm far less easily distracted by everyday stressors now, focusing instead on the long-term impact of my vocational and personal contributions."
          ]
        }
      },
      { 
        text: "How can understanding different personality types help improve teamwork?", 
        structure: "benefit 1 → benefit 2 → overall impact",
        tips: ["Mention reducing misunderstandings and leveraging strengths", "Talk about better communication"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "A deep understanding of diverse personality types is a fundamental prerequisite for high-performing teamwork, as it allows for the strategic alignment of individual temperaments with specific organizational roles. This process not only increases operational efficiency but also keeps every team member more engaged and intrinsically motivated.",
          "Well, it significantly mitigates potential interpersonal friction by empowering us to adapt our communicative styles to better resonate with each other's cognitive profiles. When we collectively respect and leverage our diverse psychological makeup, we can build a much more resilient and creative collaborative environment.",
          "Actually, I'm of the belief that it leads to much more innovative problem-solving, as a team characterized by a diversity of personality types can interrogate challenges from a multitude of non-linear angles. It creates a rich and synergistic environment where everyone feels inspired to contribute their highest-level thinking."
          ]
        }
      }
    ]
  },
  {
    id: 28,
    phase: 3,
    title: "Hypothetical Scenarios",
    description: "Use your imagination to talk about 'what if' situations.",
    keywords: [
      { word: "if I were in your shoes", vietnamese: "nếu tôi ở trong hoàn cảnh của bạn", example: "If I were in your shoes, I would take that opportunity." },
      { word: "it's highly unlikely", vietnamese: "rất ít khả năng xảy ra", example: "It's highly unlikely that I will win the lottery, but it's fun to dream." },
      { word: "what if...", vietnamese: "chuyện gì sẽ xảy ra nếu...", example: "What if you could travel back in time?" }
    ],
    questions: [
      { 
        text: "If you won the lottery tomorrow, what is the first thing you would do?", 
        structure: "initial reaction → specific action → long-term plan",
        tips: ["Use conditional structure (I would...)", "Be creative but thoughtful"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "If I were fortunate enough to win the lottery, my immediate priority would be to establish a self-sustaining foundation dedicated to providing advanced technical education in underserved regional areas. Achieving this degree of financial autonomy would empower me to contribute to large-scale systemic change with an impact otherwise impossible.",
          "Well, I would undoubtedly dedicate several years to traveling across diverse global landscapes to immerse myself in unfamiliar cultural and intellectual paradigms. It's a once-in-a-lifetime opportunity for profound self-discovery that would broaden my perspective with a depth that no traditional academic pursuit could replicate.",
          "Actually, I would strategically invest a significant portion of the capital into a portfolio of sustainable technology ventures that prioritize ecological restoration over traditional quarterly profits. I've long desired to be a primary catalyst for environmental preservation, and this would provide the ultimate platform for my aspirations."
          ]
        }
      },
      { 
        text: "If you could travel back in time, where would you go and what would you see?", 
        structure: "destination/era → what you would do → why",
        tips: ["Be creative and mention the historical importance", "Talk about the sensory experience"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I harbored an intense aspiration to eventually experience the Florentine Renaissance at its zenith, in order to witness the unprecedented confluence of artistic genius and scientific inquiry first-hand. Inhabiting that unique period of human flourishing would be exceptionally culturally illuminating and a profound source of creative inspiration.",
          "To be perfectly honest, I'd go back to meticulously observe the architectural marvel that is the construction of the Great Pyramids. Witnessing that unprecedented manifestation of ancient engineering and societal coordination would be a breathtaking and highly profound experience that remains a mystery to the modern world.",
          "Actually, I'd strongly gravitate towards the early 20.th century to witness the initial sparks of the digital revolution and the birth of modern socio-political ideologies. I find the rapid, paradigm-shifting change of that era to be exceptionally intellectually stimulating and a unique mirror of our own uncertain times."
          ]
        }
      },
      { 
        text: "If you were given the chance to live on another planet, would you go? Why or why not?", 
        structure: "Yes/No → reason 1 → reason 2 → conclusion",
        tips: ["Talk about the spirit of adventure vs. the love for Earth", "Mention the challenges and risks"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "To be perfectly honest, I would choose to remain here on Earth, even if provided with the ultimate opportunity for planetary migration. While the concept of exploring an alien world is exhilarating, I'm firmly of the belief that our own planet possesses a level of biological richness and cultural diversity that is irreplaceable and worthy of my dedicated stewardship.",
          "Actually, I would undoubtedly embrace the opportunity to participate in a safe, technologically advanced planetary colony, as the prospect of being a pioneer in the expansion of human civilization would be an incredible and meaningful legacy. I value the chance to contribute to our long-term survival as a multi-planetary species.",
          "I believe it depends entirely on whether the mission could provide a stable, sustainable environment that prioritized high-level human connection and ecological integrity. While the potential for profound discovery is vast, the risk of social isolation and the psychological impact of living in a harsh, alien landscape would require meticulous consideration."
          ]
        }
      }
    ]
  },
  {
    id: 29,
    phase: 3,
    title: "News and Media",
    description: "Discuss how we consume information and its influence on society.",
    keywords: [
      { word: "keep up with the news", vietnamese: "cập nhật tin tức", example: "I use social media to keep up with the latest news." },
      { word: "reliable source", vietnamese: "nguồn tin đáng tin cậy", example: "It's important to verify information from a reliable source." },
      { word: "misinformation", vietnamese: "thông tin sai lệch", example: "Social media can sometimes spread misinformation quickly." }
    ],
    questions: [
      { 
        text: "How do you usually keep up with what's happening in the world?", 
        structure: "platform → frequency → why you trust it",
        tips: ["Mention the shift from traditional to digital media", "Talk about critical thinking"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I cultivate a highly curated news diet, primarily utilizing a mix of long-form analytical podcasts and investigative news platforms to gain a more nuanced perspective on global events. I find that this selective engagement is essential for circumventing the sensationalism and information fragmentation of modern news cycles.",
          "To be perfectly honest, I prioritize following several dedicated subject-matter experts across various digital platforms to receive real-time updates within their specific fields. However, I maintain a rigorous protocol of cross-referencing this information with established, reliable sources like Reuters to ensure its total accuracy.",
          "Actually, I'm a proponent of reading in-depth, long-form investigative articles several times a week to gain the necessary context behind the headlines. I find that this slower approach to information consumption is indispensable for building a far more comprehensive and accurate understanding of our complex geopolitical landscape."
          ]
        }
      },
      { 
        text: "Do you think news media has too much influence on public opinion? Why?", 
        structure: "opinion → reason 1 → reason 2 → conclusion",
        tips: ["Talk about how the news shapes our perspectives", "Mention the importance of diverse viewpoints"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I'm firmly of the opinion that the news media exerts an exceptionally potent influence over public discourse, as it often determines not only the significance of specific topics but also the linguistic framing through which they are perceived. This can occasionally lead to an inadvertently narrow perspective unless we collectively prioritize diverse viewpoints.",
          "Well, I believe this influence is an unavoidable consequence of our digital era where information news is persistent and all-pervasive. However, if individuals prioritize developing rigorous critical thinking skills and seek out high-quality, diverse information sources, they can effectively balance this influence to form a truly independent opinion.",
          "Actually, I believe the responsibility for accurate discourse is a shared burden between media producers and their consumers. Journalists must prioritize objective, ethical reporting, while we, as informed citizens, must proactively verify information and understand the potential cognitive biases that can cloud our understanding of complex issues."
          ]
        }
      },
      { 
        text: "How do you distinguish between facts and opinions when reading or watching the news?", 
        structure: "strategy 1 → strategy 2 → benefit",
        tips: ["Mention verifying sources and cross-referencing", "Talk about looking for emotional language"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I consistently begin my news evaluation by checking if the reported information is supported by empirical data or verified official documentation from multiple, independent international outlets. If an article utilizes highly emotional or non-neutral language, I become significantly more cautious regarding its factual claims.",
          "Well, a rigorous protocol of cross-referencing a significant story across different media platforms helps me identify the verifiable core of the narrative and distinguish it from the subjective interpretations characteristic of each journalist. This provides a more balanced and accurate picture of reality.",
          "Actually, I prioritize investigating the background and professional credentials of an author, alongside the long-term reputation of the platform that hosts the information. Trusting only exceptionally transparent and accountable sources of truth makes it far easier to isolate factual data from mere opinion or speculation."
          ]
        }
      }
    ]
  },
  {
    id: 30,
    phase: 3,
    title: "Reflection on the Journey",
    description: "Celebrate completing the 30 days and reflect on your growth.",
    keywords: [
      { word: "come a long way", vietnamese: "tiến bộ rất nhiều", example: "I feel like my English has come a long way in just 30 days." },
      { word: "keep up the momentum", vietnamese: "duy trì đà phát triển/tiến độ", example: "Now that the challenge is over, I need to keep up the momentum." },
      { word: "proud of myself", vietnamese: "tự hào về bản thân", example: "I am really proud of myself for sticking to this routine." }
    ],
    questions: [
      { 
        text: "Looking back at the past 30 days, what is the most important thing you've learned about yourself?", 
        structure: "achievement → struggle overcome → future commitment",
        tips: ["Reflect on discipline and consistency", "Acknowledge your progress in speaking"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "Reflecting on this 30-day odyssey, I've come to recognize a profound capacity for discipline and consistency within my own character that I previously underestimated. This journey has not only enhanced my linguistic fluency but has also reinforced my belief in the transformative power of incremental progress toward a long-term goal.",
          "The most meaningful discovery I've made is that making errors while speaking is an essential and valuable component of the master process. I feel that my communicative confidence has evolved significantly, and I'm deeply proud of my ability to maintain a high level of engagement every single day of this challenge.",
          "I've discovered that I harbor a genuine passion for the process of academic English acquisition when it is structured with this level of immersive intent. I plan to maintain this powerful momentum by continuing to set ambitious but achievable daily goals for my ongoing intellectual and linguistic evolution."
          ]
        }
      },
      { 
        text: "What advice would you give to someone who is just starting this 30-day challenge?", 
        structure: "tip 1 → tip 2 → word of encouragement",
        tips: ["Mention the importance of small wins", "Talk about not being too hard on yourself"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I would strongly advise any newcomer to prioritize consistent daily engagement over the pursuit of immediate linguistic perfection. In the initial stages, maintain a high level of momentum even on the most challenging days is far more essential than being perfect, and simply showing up is already a significant victory.",
          "Well, embrace the unavoidable discomfort of initial errors and try to integrate the learning process as seamlessly as possible into your daily interests. Surrounding yourself with English-language media that genuinely resonates with your creative and intellectual passions will help you stay intrinsically motivated throughout the challenge.",
          "Actually, maintaining your commitment even during those periods of lower motivation is exactly what will define your eventual success. The profound sense of intellectual achievement you'll experience at the conclusion of these 30 days is exceptionally rewarding and entirely worth the dedicated effort you invest today."
          ]
        }
      },
      { 
        text: "How do you plan to continue improving your English skills in the future?", 
        structure: "action plan → specific tool → long-term goal",
        tips: ["Mention joining a speaking club or taking an advanced course", "Talk about making it a daily habit"],
        examples: {
          6: [
            "Sample answer for Band 6.0+",
            "Simplified version of the response.",
            "Basic structures and common vocabulary."
          ],
          7: [
            "Sample answer for Band 7.0+",
            "Intermediate structure with some complex vocabulary.",
            "Clear transitions and accurate grammar."
          ],
          8: [
            "I intend to integrate into a high-level English-speaking professional forum to continue refining my conversational fluency and technical vocabulary within a real-world context. This will be supplemented by a daily diet of investigative podcasts to ensure my listening comprehension remains at an advanced level.",
          "Well, I'm currently researching several advanced certifications in academic and business English to help me achieve my long-term career aspirations. My goal is to navigate international professional environments with a level of communicative sophistication and a nuanced command of the language.",
          "Actually, I'm committed to making English a permanent facet of my intellectual life by engaging exclusively with original-language literature and news media. My objective is to achieve a state of linguistic proficiency where I can communicate complex ideas naturally and effortlessly with anyone, anywhere in the global landscape."
          ]
        }
      }
    ]
  }
];
