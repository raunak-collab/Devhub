 import {
     Flame,
     ArrowRight,
     Braces,
     KeyRound,
     ShieldCheck,
     Regex,
     Fingerprint,
     QrCode,
     ArrowLeft,
     FileCode2,
     FileJson,
     Table2,
     FileText,
     Palette,
     Globe,
     Code2,
     Brackets,
     Type,
     MapPin,
     FileCheck2,
     FileSpreadsheet,
     FileCode,
     CodeXml,
     Paintbrush,
     Minimize2,
     WandSparkles,
     ImageIcon,
     ImageDown,
     Link2,
     Settings2,
     ListTree,
     Send,
     PanelsTopLeft,
     ServerCog,
     Globe2,
     Network,
     Workflow,
     Hash,
     ShieldPlus,
     ScanSearch,
     KeySquare,
     LockKeyhole,
     Key,
     Clock3,
     CalendarDays,
     Binary,
     HardDrive,
     FileImage,
     Scaling,
     Text,
     List,
     GitCompare,
     ALargeSmall,
     RefreshCcw,
     Eraser,
     CaseUpper,
     Dices,
     Timer,
     LecternIcon
 } from "lucide-react"
 import { FiImage } from "react-icons/fi";
 
export const AllTools = [
        {
            title: "JSON Formatter",
            desc: "Format, validate and beautify JSON data",
            icon: Braces,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
            type: 'Development',
            typeColor: 'text-violet-600',
            typeBg: 'bg-violet-600/15'
        },
        {
            title: "Password Generator",
            desc: "Generate strong and secure passwords",
            icon: KeyRound,
            iconColor: "text-white",
            iconBg: "bg-amber-600",
            type: 'Security',
            typeColor: "text-amber-600",
            typeBg: "bg-amber-600/15"
        },
        {
            title: "JWT Decoder",
            desc: "Decode and verify JWT tokens",
            icon: ShieldCheck,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: 'Security',
            typeColor: 'text-cyan-600',
            typeBg: 'bg-cyan-600/15'
        },
        {
            title: "Regex Tester",
            desc: "Test and debug regular expressions",
            icon: Regex,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: 'Development',
            typeColor: 'text-pink-600',
            typeBg: 'bg-pink-600/15'
        },
        {
            title: "UUID Generator",
            desc: "Generate unique UUIDs instantly",
            icon: Fingerprint,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            type: 'Database',
            typeColor: 'text-emerald-600',
            typeBg: 'bg-emerald-600/15'
        },
        {
            title: "QR Code Generator",
            desc: "Generate QR codes for any text or URL",
            icon: QrCode,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: 'Encoding',
            typeColor: 'text-orange-600',
            typeBg: 'bg-orange-600/15'
        },
        {
            title: "XML Formatter",
            desc: "Format and beautify XML documents instantly",
            icon: FileCode2,
            iconColor: "text-white",
            iconBg: "bg-red-600",
            type: "Formatting",
            typeColor: "text-red-500",
            typeBg: "bg-red-600/15"
        },
        {
            title: "YAML Formatter",
            desc: "Format and validate YAML configuration files",
            icon: FileJson,
            iconColor: "text-white",
            iconBg: "bg-yellow-600",
            type: "Formatting",
            typeColor: "text-yellow-500",
            typeBg: "bg-yellow-600/15"
        },
        {
            title: "CSV to JSON",
            desc: "Convert CSV data into structured JSON format",
            icon: Table2,
            iconColor: "text-white",
            iconBg: "bg-green-600",
            type: "Conversion",
            typeColor: "text-green-500",
            typeBg: "bg-green-600/15"
        },
        {
            title: "Markdown Previewer",
            desc: "Write and preview Markdown content in real time",
            icon: FileText,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Text",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "Color Converter",
            desc: "Convert HEX, RGB, HSL and other colour formats",
            icon: Palette,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: "Design",
            typeColor: "text-pink-500",
            typeBg: "bg-pink-600/15"
        },
        {
            title: "HTTP Status Checker",
            desc: "Check HTTP response status codes and meanings",
            icon: Globe,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "Network",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "HTML Minifier",
            desc: "Minify HTML code to reduce file size",
            icon: Code2,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Development",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "CSS Minifier",
            desc: "Compress CSS code for faster web performance",
            icon: Brackets,
            iconColor: "text-white",
            iconBg: "bg-sky-600",
            type: "Development",
            typeColor: "text-sky-500",
            typeBg: "bg-sky-600/15"
        },
        {
            title: "Text Case Converter",
            desc: "Convert text between uppercase, lowercase and more",
            icon: Type,
            iconColor: "text-white",
            iconBg: "bg-purple-600",
            type: "Text",
            typeColor: "text-purple-500",
            typeBg: "bg-purple-600/15"
        },
        {
            title: "IP Address Lookup",
            desc: "Analyze and inspect IP address information",
            icon: MapPin,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            type: "Network",
            typeColor: "text-emerald-500",
            typeBg: "bg-emerald-600/15"
        },
        {
            title: "JSON Validator",
            desc: "Validate JSON data and identify syntax errors",
            icon: FileCheck2,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
            type: "Development",
            typeColor: "text-violet-500",
            typeBg: "bg-violet-600/15"
        },
        {
            title: "JSON to CSV",
            desc: "Convert JSON objects into CSV format easily",
            icon: FileSpreadsheet,
            iconColor: "text-white",
            iconBg: "bg-green-600",
            type: "Conversion",
            typeColor: "text-green-500",
            typeBg: "bg-green-600/15"
        },
        {
            title: "JSON to XML",
            desc: "Convert JSON data into structured XML format",
            icon: FileCode,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Conversion",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "HTML Formatter",
            desc: "Format and beautify your HTML source code",
            icon: CodeXml,
            iconColor: "text-white",
            iconBg: "bg-orange-500",
            type: "Development",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-500/15"
        },
        {
            title: "JavaScript Formatter",
            desc: "Beautify and format JavaScript code instantly",
            icon: Braces,
            iconColor: "text-white",
            iconBg: "bg-yellow-600",
            type: "Development",
            typeColor: "text-yellow-500",
            typeBg: "bg-yellow-600/15"
        },
        {
            title: "CSS Formatter",
            desc: "Clean and format compressed CSS stylesheets",
            icon: Paintbrush,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Development",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "JavaScript Minifier",
            desc: "Minify JavaScript code for smaller file sizes",
            icon: Minimize2,
            iconColor: "text-white",
            iconBg: "bg-yellow-500",
            type: "Development",
            typeColor: "text-yellow-500",
            typeBg: "bg-yellow-500/15"
        },
        {
            title: "CSS Beautifier",
            desc: "Make compressed CSS readable and well formatted",
            icon: WandSparkles,
            iconColor: "text-white",
            iconBg: "bg-sky-600",
            type: "Development",
            typeColor: "text-sky-500",
            typeBg: "bg-sky-600/15"
        },

        {
            title: "Base64 Image Decoder",
            desc: "Decode Base64 image data into usable files",
            icon: ImageDown,
            iconColor: "text-white",
            iconBg: "bg-purple-600",
            type: "Images",
            typeColor: "text-purple-500",
            typeBg: "bg-purple-600/15"
        },

        {
            title: "URL Parser",
            desc: "Break down URLs into their individual components",
            icon: Link2,
            iconColor: "text-white",
            iconBg: "bg-indigo-600",
            type: "Network",
            typeColor: "text-indigo-500",
            typeBg: "bg-indigo-600/15"
        },
        {
            title: "URL Shortener",
            desc: "Create short and shareable URLs from long links",
            icon: Link2,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "Network",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "URL Query Builder",
            desc: "Build URL query parameters quickly and easily",
            icon: Settings2,
            iconColor: "text-white",
            iconBg: "bg-teal-600",
            type: "Network",
            typeColor: "text-teal-500",
            typeBg: "bg-teal-600/15"
        },
        {
            title: "HTTP Header Parser",
            desc: "Inspect and understand HTTP request headers",
            icon: ListTree,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "API",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "HTTP Request Builder",
            desc: "Build and test HTTP requests with custom headers",
            icon: Send,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            type: "API",
            typeColor: "text-emerald-500",
            typeBg: "bg-emerald-600/15"
        },
        {
            title: "API Response Formatter",
            desc: "Format API responses for easier debugging",
            icon: PanelsTopLeft,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
            type: "API",
            typeColor: "text-violet-500",
            typeBg: "bg-violet-600/15"
        },
        {
            title: "API Mock Generator",
            desc: "Generate realistic mock API response data",
            icon: ServerCog,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: "API",
            typeColor: "text-pink-500",
            typeBg: "bg-pink-600/15"
        },
        {
            title: "REST API Tester",
            desc: "Send and inspect REST API requests instantly",
            icon: Globe2,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "API",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "GraphQL Query Builder",
            desc: "Create and test GraphQL queries with ease",
            icon: Network,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: "API",
            typeColor: "text-pink-500",
            typeBg: "bg-pink-600/15"
        },
        {
            title: "GraphQL Formatter",
            desc: "Format GraphQL queries and mutations cleanly",
            icon: Workflow,
            iconColor: "text-white",
            iconBg: "bg-purple-600",
            type: "API",
            typeColor: "text-purple-500",
            typeBg: "bg-purple-600/15"
        },

        {
            title: "SHA256 Generator",
            desc: "Generate SHA256 hashes from text securely",
            icon: Hash,
            iconColor: "text-white",
            iconBg: "bg-red-600",
            type: "Security",
            typeColor: "text-red-500",
            typeBg: "bg-red-600/15"
        },
        {
            title: "SHA512 Generator",
            desc: "Generate SHA512 cryptographic hashes instantly",
            icon: Fingerprint,
            iconColor: "text-white",
            iconBg: "bg-rose-600",
            type: "Security",
            typeColor: "text-rose-500",
            typeBg: "bg-rose-600/15"
        },
        {
            title: "HMAC Generator",
            desc: "Generate HMAC signatures using secret keys",
            icon: KeyRound,
            iconColor: "text-white",
            iconBg: "bg-amber-600",
            type: "Security",
            typeColor: "text-amber-500",
            typeBg: "bg-amber-600/15"
        },
        {
            title: "JWT Generator",
            desc: "Create JSON Web Tokens for testing purposes",
            icon: ShieldPlus,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "Security",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "JWT Inspector",
            desc: "Inspect JWT headers, payloads and claims",
            icon: ScanSearch,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Security",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "Token Generator",
            desc: "Generate random secure tokens for development",
            icon: KeySquare,
            iconColor: "text-white",
            iconBg: "bg-indigo-600",
            type: "Security",
            typeColor: "text-indigo-500",
            typeBg: "bg-indigo-600/15"
        },
        {
            title: "Encryption Tool",
            desc: "Encrypt and decrypt text using common algorithms",
            icon: LockKeyhole,
            iconColor: "text-white",
            iconBg: "bg-red-600",
            type: "Security",
            typeColor: "text-red-500",
            typeBg: "bg-red-600/15"
        },
        {
            title: "RSA Key Generator",
            desc: "Generate RSA key pairs for development testing",
            icon: KeyRound,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Security",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "Password Strength Checker",
            desc: "Check the strength of a password instantly",
            icon: ShieldCheck,
            iconColor: "text-white",
            iconBg: "bg-green-600",
            type: "Security",
            typeColor: "text-green-500",
            typeBg: "bg-green-600/15"
        },
        {
            title: "Secret Key Generator",
            desc: "Generate random secret keys for applications",
            icon: Key,
            iconColor: "text-white",
            iconBg: "bg-yellow-600",
            type: "Security",
            typeColor: "text-yellow-500",
            typeBg: "bg-yellow-600/15"
        },

        {
            title: "Unix Timestamp Generator",
            desc: "Convert dates into Unix timestamps quickly",
            icon: Clock3,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Conversion",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "Date Difference Calculator",
            desc: "Calculate the difference between two dates",
            icon: CalendarDays,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Conversion",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "Time Zone Converter",
            desc: "Convert date and time between different time zones",
            icon: Globe,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "Conversion",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "Number Base Converter",
            desc: "Convert numbers between binary, decimal and hex",
            icon: Binary,
            iconColor: "text-white",
            iconBg: "bg-indigo-600",
            type: "Conversion",
            typeColor: "text-indigo-500",
            typeBg: "bg-indigo-600/15"
        },
        {
            title: "Binary Converter",
            desc: "Convert binary numbers into readable values",
            icon: Binary,
            iconColor: "text-white",
            iconBg: "bg-purple-600",
            type: "Conversion",
            typeColor: "text-purple-500",
            typeBg: "bg-purple-600/15"
        },
        {
            title: "Hex Converter",
            desc: "Convert hexadecimal values to other number systems",
            icon: Hash,
            iconColor: "text-white",
            iconBg: "bg-teal-600",
            type: "Conversion",
            typeColor: "text-teal-500",
            typeBg: "bg-teal-600/15"
        },
        {
            title: "Bytes Converter",
            desc: "Convert bytes between KB, MB, GB and TB",
            icon: HardDrive,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            type: "Conversion",
            typeColor: "text-emerald-500",
            typeBg: "bg-emerald-600/15"
        },
        {
            title: "Image Format Converter",
            desc: "Convert images between popular file formats",
            icon: FiImage,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: "Images",
            typeColor: "text-pink-500",
            typeBg: "bg-pink-600/15"
        },
        {
            title: "SVG Optimizer",
            desc: "Optimize SVG files for better web performance",
            icon: FileImage,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Images",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "Image Resizer",
            desc: "Resize images to custom width and height",
            icon: Scaling,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Images",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },

        {
            title: "Lorem Ipsum Generator",
            desc: "Generate placeholder text for your projects",
            icon: Text,
            iconColor: "text-white",
            iconBg: "bg-violet-600",
            type: "Text",
            typeColor: "text-violet-500",
            typeBg: "bg-violet-600/15"
        },
        {
            title: "Word Counter",
            desc: "Count words, characters and sentences in text",
            icon: List,
            iconColor: "text-white",
            iconBg: "bg-blue-600",
            type: "Text",
            typeColor: "text-blue-500",
            typeBg: "bg-blue-600/15"
        },
        {
            title: "Text Diff Checker",
            desc: "Compare two text blocks and find differences",
            icon: GitCompare,
            iconColor: "text-white",
            iconBg: "bg-purple-600",
            type: "Text",
            typeColor: "text-purple-500",
            typeBg: "bg-purple-600/15"
        },
        {
            title: "Slug Generator",
            desc: "Convert text into clean URL-friendly slugs",
            icon: Link2,
            iconColor: "text-white",
            iconBg: "bg-emerald-600",
            type: "Text",
            typeColor: "text-emerald-500",
            typeBg: "bg-emerald-600/15"
        },
        {
            title: "ASCII Converter",
            desc: "Convert text characters to ASCII values",
            icon: ALargeSmall,
            iconColor: "text-white",
            iconBg: "bg-cyan-600",
            type: "Text",
            typeColor: "text-cyan-500",
            typeBg: "bg-cyan-600/15"
        },
        {
            title: "Text Reverser",
            desc: "Reverse characters or words in your text",
            icon: RefreshCcw,
            iconColor: "text-white",
            iconBg: "bg-pink-600",
            type: "Text",
            typeColor: "text-pink-500",
            typeBg: "bg-pink-600/15"
        },
        {
            title: "Whitespace Cleaner",
            desc: "Remove unnecessary spaces and blank lines",
            icon: Eraser,
            iconColor: "text-white",
            iconBg: "bg-orange-600",
            type: "Text",
            typeColor: "text-orange-500",
            typeBg: "bg-orange-600/15"
        },
        {
            title: "Case Converter",
            desc: "Convert text into camel, snake, kebab and other cases",
            icon: CaseUpper,
            iconColor: "text-white",
            iconBg: "bg-indigo-600",
            type: "Text",
            typeColor: "text-indigo-500",
            typeBg: "bg-indigo-600/15"
        },
        {
            title: "Random Number Generator",
            desc: "Generate random numbers within a custom range",
            icon: Dices,
            iconColor: "text-white",
            iconBg: "bg-green-600",
            type: "Utilities",
            typeColor: "text-green-500",
            typeBg: "bg-green-600/15"
        },
        {
            title: "Cron Expression Generator",
            desc: "Create and understand cron scheduling expressions",
            icon: Timer,
            iconColor: "text-white",
            iconBg: "bg-rose-600",
            type: "Utilities",
            typeColor: "text-rose-500",
            typeBg: "bg-rose-600/15"
        }

    ];