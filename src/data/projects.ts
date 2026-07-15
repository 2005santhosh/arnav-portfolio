// Videos served as static files from /public/videos/ → fast HTTP streaming with byte-range support.
// Browser streams only the bytes needed to show the first frame as thumbnail.
const V  = (n: string) => `/videos/${encodeURIComponent(n)}`
const V3 = (n: string) => `/videos/3d-animation/${encodeURIComponent(n)}`

export interface Project {
  id: string
  title: string
  category: 'motion' | 'render' | 'animation'
  client: string
  software: string[]
  description: string
  thumbnail: string
  videoUrl: string
  tags: string[]
  year: number
  featured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  text: string
  rating: number
  videoUrl?: string
  isVideo?: boolean
}

/* ── Motion Graphics ─────────────────────────────── */
export const projects: Project[] = [
  {
    id: 'ai-cadence',
    title: 'AI Cadence',
    category: 'motion', client: 'AI Cadence',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Motion graphics for an AI productivity platform.',
    thumbnail: '', videoUrl: V('AI Cadence.mp4'),
    tags: ['Motion Graphics', 'SaaS'], year: 2024, featured: true,
  },
  {
    id: 'cred-app',
    title: 'Cred App',
    category: 'motion', client: 'Cred',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Premium product video for Cred.',
    thumbnail: '', videoUrl: V('Cred app.mp4'),
    tags: ['Fintech', 'Product'], year: 2024, featured: true,
  },
  {
    id: 'vmg-digital',
    title: 'VMG Digital',
    category: 'motion', client: 'VMG Digital',
    software: ['After Effects', 'DaVinci Resolve'],
    description: 'Brand anthem for a digital marketing agency.',
    thumbnail: '', videoUrl: V('VMG DIGITAL.mp4'),
    tags: ['Brand Film', 'Agency'], year: 2024, featured: true,
  },
  {
    id: 'flow-iq',
    title: 'Flow IQ',
    category: 'motion', client: 'Flow IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Explainer for a workflow automation tool.',
    thumbnail: '', videoUrl: V('Flow IQ.mp4'),
    tags: ['SaaS', 'Explainer'], year: 2024, featured: true,
  },
  {
    id: 'schedule-iq',
    title: 'Schedule IQ',
    category: 'motion', client: 'Schedule IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Product launch for a scheduling platform.',
    thumbnail: '', videoUrl: V('Schedule IQ.mp4'),
    tags: ['Product Launch', 'SaaS'], year: 2024, featured: true,
  },
  {
    id: 'parcel-multi-token',
    title: 'Parcel Multi-token',
    category: 'motion', client: 'Parcel',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Feature explainer for multi-token payments.',
    thumbnail: '', videoUrl: V('Parcel multi-token.mp4'),
    tags: ['Web3', 'Explainer'], year: 2023,
  },
  {
    id: 'parcel-notification',
    title: 'Parcel — Notification',
    category: 'motion', client: 'Parcel',
    software: ['After Effects'],
    description: 'UI micro-animation for notification system.',
    thumbnail: '', videoUrl: V('Parcel - Notification.mp4'),
    tags: ['UI Motion', 'App'], year: 2023,
  },
  {
    id: 'crizpo-v2',
    title: 'Crizpo V2',
    category: 'motion', client: 'Crizpo',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Version 2 launch campaign for Crizpo.',
    thumbnail: '', videoUrl: V('Crizpo ver-2.mp4'),
    tags: ['Brand Refresh', 'Campaign'], year: 2023,
  },
  {
    id: 'crizpo-9x16',
    title: 'Crizpo — Social Cut',
    category: 'motion', client: 'Crizpo',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Vertical format for social media.',
    thumbnail: '', videoUrl: V('crizpo v2-2 (9x16).mp4'),
    tags: ['Social Media', 'Reels'], year: 2023,
  },
  {
    id: 'prospect-iq',
    title: 'Prospect IQ — CRM',
    category: 'motion', client: 'Prospect IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Product update for a CRM platform.',
    thumbnail: '', videoUrl: V('prospect-iq-crm-app-product-update-video_1-prospect-iq-crm-app-product-update-video.mp4'),
    tags: ['CRM', 'SaaS'], year: 2023,
  },
  {
    id: 'motion-reel',
    title: 'Motion Reel 2024',
    category: 'motion', client: 'Personal',
    software: ['After Effects', 'DaVinci Resolve'],
    description: 'Compilation showreel.',
    thumbnail: '', videoUrl: V('3179100155.mp4'),
    tags: ['Showreel'], year: 2024,
  },

  /* ── 3D Rendering (placeholder — no videos yet) ── */
  {
    id: 'arch-viz-tower',
    title: 'Skyline Tower',
    category: 'render', client: 'Studio Project',
    software: ['Blender', 'Octane Render'],
    description: 'Architectural visualisation of a high-rise complex.',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    videoUrl: '',
    tags: ['Arch Viz', 'Photoreal'], year: 2024,
  },
  {
    id: 'product-render-watch',
    title: 'Precision Watch',
    category: 'render', client: 'Studio Project',
    software: ['Cinema 4D', 'Redshift'],
    description: 'Luxury product render.',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
    videoUrl: '',
    tags: ['Product', 'Luxury'], year: 2024,
  },
  {
    id: 'car-render',
    title: 'Liquid Chrome',
    category: 'render', client: 'Studio Project',
    software: ['Cinema 4D', 'Octane Render'],
    description: 'Automotive CGI exploration.',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
    videoUrl: '',
    tags: ['Automotive', 'CGI'], year: 2023,
  },

  /* ── 3D Animation ───────────────────────────────── */
  {
    id: 'bag-anim',
    title: 'BaG Commercial',
    category: 'animation', client: 'Studio Project',
    software: ['Blender', 'Cinema 4D'], description: '3D product animation commercial.',
    thumbnail: '', videoUrl: V3('BaG Anim Comm.MOV'),
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'band-jewellery',
    title: 'Band 3D Jewellery',
    category: 'animation', client: 'Studio Project',
    software: ['Cinema 4D', 'Octane'], description: 'Jewellery 3D animation commercial.',
    thumbnail: '', videoUrl: V3('Band 3d Jewellery Anim COmm.MOV'),
    tags: ['3D Animation', 'Jewellery'], year: 2024,
  },
  {
    id: 'bibli-p',
    title: 'Bibli P',
    category: 'animation', client: 'Studio Project',
    software: ['Blender'], description: '3D product animation.',
    thumbnail: '', videoUrl: V3('Bibli P.MOV'),
    tags: ['3D Animation'], year: 2024,
  },
  {
    id: 'camera-done',
    title: 'Camera Animation',
    category: 'animation', client: 'Studio Project',
    software: ['Blender', 'Cinema 4D'], description: 'Camera product 3D animation.',
    thumbnail: '', videoUrl: V3('Camera done.mp4'),
    tags: ['3D Animation', 'Product'], year: 2024,
  },
  {
    id: 'cloth-sim-ukraine',
    title: 'Cloth Simulation',
    category: 'animation', client: 'Studio Project',
    software: ['Blender'], description: 'Cloth simulation animation.',
    thumbnail: '', videoUrl: V3('Cloth Sim Ukraine.MOV'),
    tags: ['3D Animation', 'Simulation'], year: 2024,
  },
  {
    id: 'cytolife',
    title: 'CytoLife Commercial',
    category: 'animation', client: 'CytoLife',
    software: ['Cinema 4D', 'Redshift'], description: '3D animation commercial for CytoLife.',
    thumbnail: '', videoUrl: V3('CytoLife Anim Comm.MOV'),
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'done-beauty',
    title: 'Done Beauty',
    category: 'animation', client: 'Done Beauty',
    software: ['Cinema 4D', 'Octane'], description: 'Beauty brand 3D product animation.',
    thumbnail: '', videoUrl: V3('Done Beauty 1920x1080.mp4'),
    tags: ['3D Animation', 'Beauty'], year: 2024,
  },
  {
    id: 'loci-glasses',
    title: 'Loci Glasses',
    category: 'animation', client: 'Loci',
    software: ['Blender', 'Cinema 4D'], description: 'Eyewear commercial animation.',
    thumbnail: '', videoUrl: V3('Loci_Glasses_Commercial_Horizontal.mov'),
    tags: ['3D Animation', 'Fashion'], year: 2024,
  },
  {
    id: 'moncler',
    title: 'Moncler Commercial',
    category: 'animation', client: 'Moncler',
    software: ['Cinema 4D', 'Redshift'], description: 'Luxury fashion 3D commercial.',
    thumbnail: '', videoUrl: V3('Moncler Comm.mov'),
    tags: ['3D Animation', 'Luxury'], year: 2024,
  },
  {
    id: 'omega',
    title: 'Omega Final',
    category: 'animation', client: 'Studio Project',
    software: ['Cinema 4D', 'Octane'], description: 'Watch product animation.',
    thumbnail: '', videoUrl: V3('Omega_Final.mp4'),
    tags: ['3D Animation', 'Watch'], year: 2024,
  },
  {
    id: 'oxyshred',
    title: 'OxyShred Commercial',
    category: 'animation', client: 'OxyShred',
    software: ['Cinema 4D', 'Redshift'], description: 'Supplement product commercial animation.',
    thumbnail: '', videoUrl: V3('Oxyshred Comm.MP4'),
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'peel-anim',
    title: 'PEEL Commercial',
    category: 'animation', client: 'PEEL',
    software: ['Blender', 'Cinema 4D'], description: '3D product commercial.',
    thumbnail: '', videoUrl: V3('PEEL Anim Comm.MOV'),
    tags: ['3D Animation', 'Product'], year: 2024,
  },
  {
    id: 'rayhaan-v2',
    title: 'Rayhaan Perfume V2',
    category: 'animation', client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Perfume commercial 3D animation v2.',
    thumbnail: '', videoUrl: V3('rayhaan perfume commercial V2 - Copy.mp4'),
    tags: ['3D Animation', 'Perfume'], year: 2024,
  },
  {
    id: 'rayhaan-product',
    title: 'Rayhaan 3D Product',
    category: 'animation', client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Full 3D product animation for Rayhaan Perfumes.',
    thumbnail: '', videoUrl: V3('Rayhaan Perfumes 3D PRODUCT ANIMATION.MP4'),
    tags: ['3D Animation', 'Perfume'], year: 2024,
  },
  {
    id: 'rayhaan',
    title: 'Rayhaan',
    category: 'animation', client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Rayhaan brand 3D commercial.',
    thumbnail: '', videoUrl: V3('Rayhaan.MP4'),
    tags: ['3D Animation', 'Brand'], year: 2024,
  },
  {
    id: 'revolt-card',
    title: 'Revolt Card',
    category: 'animation', client: 'Revolt',
    software: ['Cinema 4D', 'Redshift'], description: 'Fintech card product animation.',
    thumbnail: '', videoUrl: V3('Revolt Card Anim.MOV'),
    tags: ['3D Animation', 'Fintech'], year: 2024,
  },
  {
    id: 'steam-deck',
    title: 'Steam Deck',
    category: 'animation', client: 'Studio Project',
    software: ['Blender'], description: 'Gaming device product animation.',
    thumbnail: '', videoUrl: V3('Steam deck done.mp4'),
    tags: ['3D Animation', 'Gaming'], year: 2024,
  },
  {
    id: 'tellmi',
    title: 'Tellmi Animation',
    category: 'animation', client: 'Tellmi',
    software: ['Cinema 4D', 'Octane'], description: '3D animation for Tellmi brand.',
    thumbnail: '', videoUrl: V3('Tellmi Anim.MOV'),
    tags: ['3D Animation', 'Brand'], year: 2024,
  },
  {
    id: 'water-sim',
    title: 'Water Simulation',
    category: 'animation', client: 'Studio Project',
    software: ['Blender'], description: 'Fluid simulation animation.',
    thumbnail: '', videoUrl: V3('Water Sim.MOV'),
    tags: ['3D Animation', 'Simulation'], year: 2024,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1', name: 'Rahul Mehta', role: 'Founder', company: 'Flow IQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    text: "Arnav transformed our product vision into a video users instantly connected with. We saw a 40% uplift in signups.",
    rating: 5, isVideo: true, videoUrl: V('Flow IQ.mp4'),
  },
  {
    id: 't2', name: 'Priya Nair', role: 'Marketing Lead', company: 'Cred',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&q=80',
    text: "He engineers emotion. The Cred video felt premium in a way we'd never achieved before.",
    rating: 5, isVideo: true, videoUrl: V('Cred app.mp4'),
  },
  {
    id: 't3', name: 'Siddharth Rao', role: 'Head of Growth', company: 'Parcel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    text: 'The multi-token explainer has become our most-shared piece of content by a huge margin.',
    rating: 5, isVideo: true, videoUrl: V('Parcel multi-token.mp4'),
  },
  {
    id: 't4', name: 'Ananya Sharma', role: 'Brand Director', company: 'Crizpo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    text: 'The Crizpo V2 launch video set a new benchmark for our brand.',
    rating: 5,
  },
  {
    id: 't5', name: 'Vikram Singh', role: 'Co-founder', company: 'Schedule IQ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    text: 'Fast, precise, and incredibly talented. Delivered above expectations.',
    rating: 5,
  },
  {
    id: 't6', name: 'Neha Gupta', role: 'CMO', company: 'VMG Digital',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    text: "The VMG brand anthem is something we're genuinely proud to put in front of clients.",
    rating: 5,
  },
]
