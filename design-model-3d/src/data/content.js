// All learning content lives here so components stay small and reusable.
// Restaurant ordering system (SmartDine-inspired) is the single running example.

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'process', label: 'Process Dimension' },
  { id: 'abstraction', label: 'Abstraction Dimension' },
  { id: 'principles', label: 'Ten Design Principles' },
  { id: 'elements', label: 'Five Design Elements' },
  { id: 'project', label: 'Real-Time Project' },
  { id: 'workflow', label: 'Design Workflow' },
  { id: 'sequence', label: 'Sequence Diagram' },
  { id: 'quiz', label: 'Test Your Understanding' },
];

export const HERO_PARTS = {
  customer: {
    name: 'Customer Interface',
    purpose: 'Where the customer browses the menu and places an order.',
    text: 'This is the mobile application on the customer\'s phone. It shows the food menu, the cart, and the order status.',
  },
  app: {
    name: 'Application Processing Layer',
    purpose: 'Applies the business rules of the system.',
    text: 'It adds food to the cart, calculates the total, validates the order, and prepares it to be saved.',
  },
  database: {
    name: 'Database (Firebase Realtime Database)',
    purpose: 'Stores orders safely in the cloud.',
    text: 'Every placed order is saved here with the table number, food items, and quantities.',
  },
  kitchen: {
    name: 'Kitchen Display Screen',
    purpose: 'Shows new orders to the kitchen staff.',
    text: 'The kitchen TV listens to the database and shows each new order by table number.',
  },
};

export const WHY_IMPORTANT = [
  'It provides a blueprint for developers.',
  'It organizes software components.',
  'It describes how components communicate.',
  'It helps developers understand system structure.',
  'It reduces confusion during implementation.',
];

export const DESIGN_COMPONENTS = [
  { id: 'screen', name: 'Customer Screen', text: 'The screen the customer sees on the phone. It comes from the requirement "order food using a mobile application".' },
  { id: 'menu', name: 'Menu Component', text: 'Shows all food items with name, price, and an Add button.' },
  { id: 'cart', name: 'Cart Component', text: 'Keeps the selected items and quantities, and shows the total.' },
  { id: 'order', name: 'Order Processing Component', text: 'Validates the cart and creates the order with a table number.' },
  { id: 'db', name: 'Database Connection', text: 'Sends the order to the cloud database so it is stored safely.' },
  { id: 'kitchen', name: 'Kitchen Display', text: 'Receives the order from the database and shows it to the kitchen.' },
];

export const PROCESS_STAGES = [
  {
    id: 'req', name: 'Requirements Analysis',
    definition: 'Understanding what the software must do and collecting the needs of users.',
    purpose: 'To know the problem clearly before designing anything.',
    example: 'Customers must order food from a mobile phone; the kitchen must see the orders.',
    output: 'A list of requirements (a requirements specification).',
  },
  {
    id: 'data', name: 'Data/Class Design',
    definition: 'Deciding what information the system keeps and how classes or data structures are organized.',
    purpose: 'To represent real-world things like food and orders inside the software.',
    example: 'Classes: Food, Customer, Order, OrderItem, Table.',
    output: 'Class diagram and data structures.',
  },
  {
    id: 'arch', name: 'Architectural Design',
    definition: 'Deciding the overall structure of the system and how major parts talk to each other.',
    purpose: 'To give the system a clear big-picture structure.',
    example: 'Mobile app → Application logic → Firebase database → Kitchen display app.',
    output: 'Architecture diagram.',
  },
  {
    id: 'ui', name: 'Interface Design',
    definition: 'Designing how users and software parts interact with each other.',
    purpose: 'To make the system easy and clear to use.',
    example: 'Login, menu, cart, order status screens and the kitchen display screen.',
    output: 'Screen layouts and interface specifications.',
  },
  {
    id: 'comp', name: 'Component-Level Design',
    definition: 'Designing the internal logic and responsibility of each individual component.',
    purpose: 'To make each component ready to be coded.',
    example: 'Add to cart, calculate total, validate order, save order.',
    output: 'Detailed logic, flowcharts, and pseudocode for each component.',
  },
  {
    id: 'deploy', name: 'Deployment-Level Design',
    definition: 'Deciding where each software part will run on hardware and environments.',
    purpose: 'To plan how the software is placed on real devices and servers.',
    example: 'App on customer Android phone, data on Firebase cloud, display app on kitchen Android TV.',
    output: 'Deployment diagram.',
  },
];

export const ABSTRACTION_LEVELS = [
  {
    id: 'high', name: 'High Level', label: 'High-Level Design',
    text: 'Shows the whole restaurant ordering system: customers, mobile application, database, and kitchen display. Only the big parts are visible.',
  },
  {
    id: 'medium', name: 'Medium Level', label: 'Medium-Level Design',
    text: 'Zooms into the mobile application and divides it into Menu, Cart, Order, and Login modules.',
  },
  {
    id: 'low', name: 'Low Level', label: 'Low-Level Design',
    text: 'Zooms into the Order module and shows the order-processing logic, data fields, validation rules, and database operations.',
  },
];

export const PRINCIPLES = [
  { id: 1, name: 'Avoid Tunnel Vision', viz: 'options', definition: 'Consider different possible solutions instead of focusing on only one approach.', why: 'The first idea is not always the best idea.', example: 'Compare different ways to send restaurant orders to the kitchen before selecting a solution.' },
  { id: 2, name: 'Traceability', viz: 'trace', definition: 'Every important design element should be connected to a software requirement.', why: 'It proves that nothing in the design is unnecessary and no requirement is missed.', example: 'The food cart component exists because customers need to select and review food items.' },
  { id: 3, name: 'Reuse Existing Solutions', viz: 'reuse', definition: 'Reuse proven software components when appropriate instead of rebuilding everything.', why: 'It saves time and reduces mistakes.', example: 'Use a reusable menu card component for every food item.' },
  { id: 4, name: 'Minimize the Gap Between Software and Real-World Problems', viz: 'tables', definition: 'The design should reflect the real problem that the software must solve.', why: 'Users understand software that works like the real world.', example: 'Organize restaurant orders according to tables, just as a real restaurant operates.' },
  { id: 5, name: 'Maintain Consistency', viz: 'consistent', definition: 'Similar components should follow similar design rules.', why: 'Users learn the system faster and developers find it easier to maintain.', example: 'All food cards use the same layout, button styles, and price formatting.' },
  { id: 6, name: 'Accommodate Change', viz: 'change', definition: 'Design software so that future changes can be implemented without rewriting the entire system.', why: 'Requirements always change over time.', example: 'Add a new food category without redesigning the complete menu screen.' },
  { id: 7, name: 'Degrade Gracefully', viz: 'degrade', definition: 'When a problem occurs, the software should continue providing essential functionality where possible.', why: 'Small failures should not stop the whole system.', example: 'If a food image fails to load, display a placeholder while keeping the food details visible.' },
  { id: 8, name: 'Assess Design Quality Continuously', viz: 'assess', definition: 'Review the design throughout development instead of waiting until the end.', why: 'Problems found early are cheaper to fix.', example: 'Test the order workflow and review the screen layouts before completing the application.' },
  { id: 9, name: 'Review to Minimize Conceptual Errors', viz: 'review', definition: 'Check the design carefully to find logical mistakes before coding.', why: 'A logical mistake in design becomes a bug in the code.', example: 'Verify that the total bill correctly includes the quantity and price of every ordered item.' },
  { id: 10, name: 'Separate Concerns', viz: 'separate', definition: 'Divide the system into independent responsibilities.', why: 'Each part is easier to understand, test, and change.', example: 'Keep login, menu display, order processing, and billing as separate modules.' },
];

export const ELEMENTS = [
  {
    id: 'data', name: 'Data/Class Design', core: true,
    definition: 'Data/Class Design describes how information is represented and how classes or data structures are organized.',
    example: 'Food, Customer, Order, OrderItem, Table.',
  },
  {
    id: 'arch', name: 'Architectural Design', core: true,
    definition: 'Architectural Design describes the overall structure of the software system and how its major components interact.',
    example: 'Customer mobile application, application logic, Firebase Realtime Database, kitchen display application.',
  },
  {
    id: 'ui', name: 'Interface Design', core: true,
    definition: 'Interface Design describes how users and software components interact.',
    example: 'Login screen, food menu screen, shopping cart screen, order status screen, kitchen display screen.',
  },
  {
    id: 'comp', name: 'Component-Level Design', core: true,
    definition: 'Component-Level Design explains the internal logic and responsibilities of individual software components.',
    example: 'Add food to cart, calculate order total, validate order details, save the order, update the kitchen display.',
  },
  {
    id: 'deploy', name: 'Deployment-Level Design', core: false,
    definition: 'Deployment-Level Design describes how software components are mapped onto the hardware and execution environments where the software runs.',
    example: 'Customer Android phone, restaurant network or internet, Firebase cloud database, kitchen Android TV.',
  },
];

export const CORE_NOTE = 'Data/Class Design, Architectural Design, Interface Design, and Component-Level Design are commonly presented as the core elements of the design model in many introductory software engineering explanations. Deployment-Level Design is included here as an additional element; some textbooks discuss it as part of deployment design or physical architecture, so classifications may vary.';

export const CLASS_BOXES = [
  { id: 'Customer', x: 40, y: 30, fields: ['name', 'phone'] },
  { id: 'Table', x: 40, y: 190, fields: ['tableNumber'] },
  { id: 'Order', x: 250, y: 100, fields: ['orderId', 'status', 'total'] },
  { id: 'OrderItem', x: 460, y: 30, fields: ['quantity'] },
  { id: 'Food', x: 460, y: 190, fields: ['name', 'price'] },
];
export const CLASS_LINKS = [
  ['Customer', 'Order', 'places'],
  ['Table', 'Order', 'has'],
  ['Order', 'OrderItem', 'contains'],
  ['OrderItem', 'Food', 'refers to'],
];

export const MENU = [
  { id: 'dosa', name: 'Plain Dosa', price: 60 },
  { id: 'biriyani', name: 'Dindigul Biriyani', price: 180 },
];

export const DEMO_STEPS = [
  { title: 'Customer Selects Food', text: 'The customer opens the menu on the phone and chooses food. Use + and − to change quantities.' },
  { title: 'Cart Processing', text: 'The cart lists the chosen items and calculates the total automatically.' },
  { title: 'Order Processing', text: 'When the customer taps Place Order, the order travels from the mobile application to the cloud database.' },
  { title: 'Database Update', text: 'The database stores the order information: table number, food items, and quantities.' },
  { title: 'Kitchen Display Update', text: 'The kitchen display listens to the database and shows the new order for the table.' },
  { title: 'Explain the Design Model', text: 'Now see which design elements were used in this order.' },
];

export const DEMO_EXPLAIN = [
  { id: 'data', name: 'Data/Class Design', text: 'Represents food and order data.', part: 'database' },
  { id: 'arch', name: 'Architectural Design', text: 'Connects the mobile application, database, and TV.', part: 'all' },
  { id: 'ui', name: 'Interface Design', text: 'Provides the customer and kitchen screens.', part: 'phone' },
  { id: 'comp', name: 'Component-Level Design', text: 'Processes food selections and calculates totals.', part: 'phone' },
  { id: 'deploy', name: 'Deployment-Level Design', text: 'Places the applications on the phone, cloud, and TV.', part: 'all' },
];

export const WORKFLOW = [
  { id: 'req', name: 'Requirements', input: 'Customer and restaurant needs.', activity: 'Collect and understand what the system must do.', output: 'Requirements list.', example: '"Customers must order food using a mobile application."' },
  { id: 'data', name: 'Data/Class Design', input: 'Requirements list.', activity: 'Find the important things and describe them as classes and data.', output: 'Class diagram.', example: 'Food, Customer, Order, OrderItem, Table.' },
  { id: 'arch', name: 'Architectural Design', input: 'Requirements and class model.', activity: 'Choose the major parts and how they communicate.', output: 'Architecture diagram.', example: 'Mobile app, Firebase database, kitchen TV app.' },
  { id: 'ui', name: 'Interface Design', input: 'Architecture and requirements.', activity: 'Design screens and how users move between them.', output: 'Screen designs.', example: 'Login, menu, cart, order status, kitchen screen.' },
  { id: 'comp', name: 'Component-Level Design', input: 'Architecture and interface designs.', activity: 'Design the internal logic of each component.', output: 'Flowcharts and pseudocode.', example: 'Calculate order total; validate order.' },
  { id: 'deploy', name: 'Deployment-Level Design', input: 'Components and architecture.', activity: 'Decide which device or server runs each part.', output: 'Deployment diagram.', example: 'Customer phone, Firebase cloud, kitchen Android TV.' },
];

export const SEQUENCE_PARTICIPANTS = ['Customer', 'Mobile Application', 'Firebase Realtime Database', 'Kitchen TV'];
export const SEQUENCE_MESSAGES = [
  { from: 0, to: 1, label: '1. Selects food', text: 'The customer taps Plain Dosa and Dindigul Biriyani on the menu screen.' },
  { from: 1, to: 1, label: '2. Adds food to cart', text: 'The mobile application adds the selected food to the cart and updates the total.' },
  { from: 0, to: 1, label: '3. Confirms order', text: 'The customer taps Place Order for Table 16.' },
  { from: 1, to: 2, label: '4. Writes order', text: 'The mobile application writes the order to Firebase Realtime Database.' },
  { from: 2, to: 2, label: '5. Stores order', text: 'Firebase stores the order in the cloud.' },
  { from: 2, to: 3, label: '6. Sends update', text: 'The kitchen TV receives the database update through its active listener.' },
  { from: 3, to: 3, label: '7. Refreshes list', text: 'The kitchen TV refreshes the order list and shows Table 16.' },
];

export const QUIZ = [
  { q: 'What is a Design Model?', options: ['A representation of how a software system will be organized and implemented before coding begins', 'The final source code of the software', 'A list of software bugs', 'A user manual'], answer: 0, why: 'A Design Model is a blueprint of the software made before coding begins.', wrong: 'The Design Model is a blueprint, not code, bugs, or a manual.' },
  { q: 'What does the Process Dimension represent?', options: ['The level of detail of the design', 'The activities and steps followed to create the design', 'The hardware used', 'The cost of the project'], answer: 1, why: 'The Process Dimension is about the design activities and steps.', wrong: 'Process Dimension = activities and steps. Level of detail belongs to the Abstraction Dimension.' },
  { q: 'What does the Abstraction Dimension represent?', options: ['The order of design activities', 'The programming language used', 'The level of detail used to describe a design', 'The number of developers'], answer: 2, why: 'Abstraction Dimension is about how detailed the design description is.', wrong: 'Abstraction Dimension = level of detail, from the overall system down to individual components.' },
  { q: 'Zooming from the whole restaurant system into the Order module’s validation rules moves the design toward…', options: ['Higher abstraction', 'Lower-level detail', 'Requirements analysis', 'Deployment'], answer: 1, why: 'Zooming in shows more detail, which is lower-level design.', wrong: 'Zooming in means more detail, so it moves toward lower-level design.' },
  { q: 'Which principle says every design element should connect to a requirement?', options: ['Traceability', 'Separate Concerns', 'Degrade Gracefully', 'Maintain Consistency'], answer: 0, why: 'Traceability links design elements to requirements, like Cart to "select and review food".', wrong: 'That is Traceability.' },
  { q: 'A food image fails to load, so a placeholder is shown and food details stay visible. Which principle is this?', options: ['Accommodate Change', 'Degrade Gracefully', 'Reuse Existing Solutions', 'Avoid Tunnel Vision'], answer: 1, why: 'The app keeps essential functionality when a problem happens.', wrong: 'This is Degrade Gracefully.' },
  { q: 'Keeping login, menu, order processing and billing as separate modules follows which principle?', options: ['Maintain Consistency', 'Traceability', 'Separate Concerns', 'Review to Minimize Conceptual Errors'], answer: 2, why: 'Each module has its own responsibility.', wrong: 'This is Separate Concerns.' },
  { q: 'Which design element describes the classes Food, Order, OrderItem and Table?', options: ['Interface Design', 'Data/Class Design', 'Deployment-Level Design', 'Architectural Design'], answer: 1, why: 'Data/Class Design organizes information into classes.', wrong: 'Classes and data structures belong to Data/Class Design.' },
  { q: 'Which element places the app on a customer phone, Firebase cloud, and kitchen Android TV?', options: ['Component-Level Design', 'Interface Design', 'Data/Class Design', 'Deployment-Level Design'], answer: 3, why: 'Deployment-Level Design maps software to hardware and environments.', wrong: 'Mapping software onto devices is Deployment-Level Design.' },
  { q: 'In the demo, Dosa ₹60 × 1 and Biriyani ₹180 × 2 give a total of…', options: ['₹240', '₹420', '₹300', '₹360'], answer: 1, why: '60 + (180 × 2) = 60 + 360 = ₹420.', wrong: 'Correct total is 60 + 360 = ₹420.' },
  { q: 'How does the kitchen TV learn about a new order in the example design?', options: ['Through an active listener on the database', 'The customer phones the kitchen', 'It prints automatically from the phone', 'It does not'], answer: 0, why: 'The TV listens to Firebase and refreshes when data changes.', wrong: 'In this example, the TV has an active listener on the database.' },
  { q: 'Real software design is…', options: ['Always one strict one-way sequence', 'Iterative: earlier decisions may be revisited', 'Done only after coding', 'Done once and never changed'], answer: 1, why: 'New requirements or technical problems can make developers revisit earlier decisions.', wrong: 'Design is iterative, not rigid.' },
];

// Seminar mode slides: concise concept per slide.
export const SEMINAR_SLIDES = [
  { title: 'Software Engineering Design Model', body: 'From Requirements to a Complete Software Design.', example: 'Example project: Restaurant Food Ordering System.', scene: 'hero' },
  { title: 'What Is a Design Model?', body: 'A Design Model is a representation of how a software system will be organized and implemented before the actual coding begins.', example: 'Requirement: customers order food on mobile → Design: menu, cart, order, database, kitchen display.' },
  { title: 'Process Dimension', body: 'The Process Dimension represents the activities and steps followed to create the software design.', example: 'Requirements → Data/Class → Architectural → Interface → Component-Level → Deployment-Level.' },
  { title: 'Abstraction Dimension', body: 'The Abstraction Dimension represents the level of detail used to describe a software design.', example: 'Whole system → Mobile app modules → Order module logic. (A teaching aid, not a fixed textbook rule.)' },
  ...PRINCIPLES.map((p) => ({ title: `Principle ${p.id}: ${p.name}`, body: p.definition, example: p.example })),
  ...ELEMENTS.map((e, i) => ({ title: `Element ${i + 1}: ${e.name}`, body: e.definition, example: e.example })),
  { title: 'Real-Time Project', body: 'A food order travels: Phone → Cloud database → Kitchen TV.', example: 'Table 16: Plain Dosa × 1, Dindigul Biriyani × 2, Total ₹420.' },
  { title: 'Design Is Iterative', body: 'Developers may revisit earlier design decisions when they find new requirements or technical problems.', example: 'Adding a new food category may change the data classes and the menu screen.' },
];
