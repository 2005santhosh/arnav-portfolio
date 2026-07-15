// Cloudinary CDN — exact public IDs from upload
const CLOUD = 'dhsyiussw'
const BASE  = `https://res.cloudinary.com/${CLOUD}/video/upload`

// Poster = first frame as JPEG (instant thumbnail, ~20KB)
const poster = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,f_jpg,q_auto:good/${publicId}.jpg`

// Direct Cloudinary URLs (version + public_id format)
const MOTION = {
  flowIq:      `${BASE}/v1784101304/Flow_IQ_pulkkm.mp4`,
  crizpo9x16:  `${BASE}/v1784101268/crizpo_v2-2_9x16_d66n7k.mp4`,
  crizpoV2:    `${BASE}/v1784101267/Crizpo_ver-2_qqaehm.mp4`,
  parcelNotif: `${BASE}/v1784101248/Parcel_-_Notification_yiggkf.mp4`,
  vmgDigital:  `${BASE}/v1784101244/VMG_DIGITAL_nax3ct.mp4`,
  scheduleIq:  `${BASE}/v1784101241/Schedule_IQ_gn49iu.mp4`,
  prospectIq:  `${BASE}/v1784101227/prospect-iq-crm-app-product-update-video_1-prospect-iq-crm-app-product-update-video_jklk9x.mp4`,
  reel:        `${BASE}/v1784101225/3179100155_jnruf1.mp4`,
  parcelMulti: `${BASE}/v1784101220/Parcel_multi-token_rh42xs.mp4`,
  aiCadence:   `${BASE}/v1784101213/AI_Cadence_ipgzwx.mp4`,
  credApp:     `${BASE}/v1784101204/Cred_app_tvxkyc.mp4`,
}

// Poster helpers — strip version prefix for poster URL
const MP = (publicId: string) => poster(publicId)
const mP = {
  flowIq:      MP('Flow_IQ_pulkkm'),
  crizpo9x16:  MP('crizpo_v2-2_9x16_d66n7k'),
  crizpoV2:    MP('Crizpo_ver-2_qqaehm'),
  parcelNotif: MP('Parcel_-_Notification_yiggkf'),
  vmgDigital:  MP('VMG_DIGITAL_nax3ct'),
  scheduleIq:  MP('Schedule_IQ_gn49iu'),
  prospectIq:  MP('prospect-iq-crm-app-product-update-video_1-prospect-iq-crm-app-product-update-video_jklk9x'),
  reel:        MP('3179100155_jnruf1'),
  parcelMulti: MP('Parcel_multi-token_rh42xs'),
  aiCadence:   MP('AI_Cadence_ipgzwx'),
  credApp:     MP('Cred_app_tvxkyc'),
}

// 3D Animation — still from public/videos/3d-animation/ for now
// (update once you share those Cloudinary URLs)
const V3 = (name: string) => `/videos/3d-animation/${encodeURIComponent(name)}`
const AP = (_: string) => ''   // no poster yet for animation

export interface Project {
  id: string
  title: string
  category: 'motion' | 'render' | 'animation'
  client: string
  software: string[]
  description: string
  thumbnail: string
  videoUrl: string
  poster: string
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

export const projects: Project[] = [
  // ── Motion Graphics ──────────────────────────────
  {
    id: 'ai-cadence',       title: 'AI Cadence',
    category: 'motion',     client: 'AI Cadence',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Motion graphics for an AI productivity platform.',
    thumbnail: '',          videoUrl: MOTION.aiCadence,      poster: mP.aiCadence,
    tags: ['Motion Graphics', 'SaaS'], year: 2024, featured: true,
  },
  {
    id: 'cred-app',         title: 'Cred App',
    category: 'motion',     client: 'Cred',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Premium product video for Cred.',
    thumbnail: '',          videoUrl: MOTION.credApp,        poster: mP.credApp,
    tags: ['Fintech', 'Product'], year: 2024, featured: true,
  },
  {
    id: 'vmg-digital',      title: 'VMG Digital',
    category: 'motion',     client: 'VMG Digital',
    software: ['After Effects', 'DaVinci Resolve'],
    description: 'Brand anthem for a digital marketing agency.',
    thumbnail: '',          videoUrl: MOTION.vmgDigital,     poster: mP.vmgDigital,
    tags: ['Brand Film', 'Agency'], year: 2024, featured: true,
  },
  {
    id: 'flow-iq',          title: 'Flow IQ',
    category: 'motion',     client: 'Flow IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Explainer for a workflow automation tool.',
    thumbnail: '',          videoUrl: MOTION.flowIq,         poster: mP.flowIq,
    tags: ['SaaS', 'Explainer'], year: 2024, featured: true,
  },
  {
    id: 'schedule-iq',      title: 'Schedule IQ',
    category: 'motion',     client: 'Schedule IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Product launch for a scheduling platform.',
    thumbnail: '',          videoUrl: MOTION.scheduleIq,     poster: mP.scheduleIq,
    tags: ['Product Launch', 'SaaS'], year: 2024, featured: true,
  },
  {
    id: 'parcel-multi',     title: 'Parcel Multi-token',
    category: 'motion',     client: 'Parcel',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Feature explainer for multi-token payments.',
    thumbnail: '',          videoUrl: MOTION.parcelMulti,    poster: mP.parcelMulti,
    tags: ['Web3', 'Explainer'], year: 2023,
  },
  {
    id: 'parcel-notif',     title: 'Parcel Notification',
    category: 'motion',     client: 'Parcel',
    software: ['After Effects'],
    description: 'UI micro-animation.',
    thumbnail: '',          videoUrl: MOTION.parcelNotif,    poster: mP.parcelNotif,
    tags: ['UI Motion', 'App'], year: 2023,
  },
  {
    id: 'crizpo-v2',        title: 'Crizpo V2',
    category: 'motion',     client: 'Crizpo',
    software: ['After Effects', 'Cinema 4D'],
    description: 'Version 2 launch campaign.',
    thumbnail: '',          videoUrl: MOTION.crizpoV2,       poster: mP.crizpoV2,
    tags: ['Brand Refresh'], year: 2023,
  },
  {
    id: 'crizpo-social',    title: 'Crizpo Social Cut',
    category: 'motion',     client: 'Crizpo',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Vertical format for social media.',
    thumbnail: '',          videoUrl: MOTION.crizpo9x16,     poster: mP.crizpo9x16,
    tags: ['Social Media', 'Reels'], year: 2023,
  },
  {
    id: 'prospect-iq',      title: 'Prospect IQ CRM',
    category: 'motion',     client: 'Prospect IQ',
    software: ['After Effects', 'Premiere Pro'],
    description: 'Product update for a CRM platform.',
    thumbnail: '',          videoUrl: MOTION.prospectIq,     poster: mP.prospectIq,
    tags: ['CRM', 'SaaS'], year: 2023,
  },
  {
    id: 'motion-reel',      title: 'Motion Reel 2024',
    category: 'motion',     client: 'Personal',
    software: ['After Effects', 'DaVinci Resolve'],
    description: 'Compilation showreel.',
    thumbnail: '',          videoUrl: MOTION.reel,           poster: mP.reel,
    tags: ['Showreel'], year: 2024,
  },

  // ── 3D Animation ─────────────────────────────────
  {
    id: 'bag-anim',         title: 'BaG Commercial',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender', 'Cinema 4D'], description: '3D product animation commercial.',
    thumbnail: '',          videoUrl: V3('BaG Anim Comm.MOV'),      poster: '',
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'band-jewellery',   title: 'Band 3D Jewellery',
    category: 'animation',  client: 'Studio Project',
    software: ['Cinema 4D', 'Octane'], description: 'Jewellery 3D animation.',
    thumbnail: '',          videoUrl: V3('Band 3d Jewellery Anim COmm.MOV'), poster: '',
    tags: ['3D Animation', 'Jewellery'], year: 2024,
  },
  {
    id: 'bibli-p',          title: 'Bibli P',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender'], description: '3D product animation.',
    thumbnail: '',          videoUrl: V3('Bibli P.MOV'),            poster: '',
    tags: ['3D Animation'], year: 2024,
  },
  {
    id: 'camera-done',      title: 'Camera Animation',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender', 'Cinema 4D'], description: 'Camera product 3D animation.',
    thumbnail: '',          videoUrl: V3('Camera done.mp4'),        poster: '',
    tags: ['3D Animation', 'Product'], year: 2024,
  },
  {
    id: 'cloth-sim',        title: 'Cloth Simulation',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender'], description: 'Cloth simulation animation.',
    thumbnail: '',          videoUrl: V3('Cloth Sim Ukraine.MOV'),  poster: '',
    tags: ['3D Animation', 'Simulation'], year: 2024,
  },
  {
    id: 'cytolife',         title: 'CytoLife Commercial',
    category: 'animation',  client: 'CytoLife',
    software: ['Cinema 4D', 'Redshift'], description: '3D animation commercial for CytoLife.',
    thumbnail: '',          videoUrl: V3('CytoLife Anim Comm.MOV'), poster: '',
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'done-beauty',      title: 'Done Beauty',
    category: 'animation',  client: 'Done Beauty',
    software: ['Cinema 4D', 'Octane'], description: 'Beauty brand 3D product animation.',
    thumbnail: '',          videoUrl: V3('Done Beauty 1920x1080.mp4'), poster: '',
    tags: ['3D Animation', 'Beauty'], year: 2024,
  },
  {
    id: 'loci-glasses',     title: 'Loci Glasses',
    category: 'animation',  client: 'Loci',
    software: ['Blender', 'Cinema 4D'], description: 'Eyewear commercial animation.',
    thumbnail: '',          videoUrl: V3('Loci_Glasses_Commercial_Horizontal.mov'), poster: '',
    tags: ['3D Animation', 'Fashion'], year: 2024,
  },
  {
    id: 'moncler',          title: 'Moncler Commercial',
    category: 'animation',  client: 'Moncler',
    software: ['Cinema 4D', 'Redshift'], description: 'Luxury fashion 3D commercial.',
    thumbnail: '',          videoUrl: V3('Moncler Comm.mov'),       poster: '',
    tags: ['3D Animation', 'Luxury'], year: 2024,
  },
  {
    id: 'omega',            title: 'Omega Final',
    category: 'animation',  client: 'Studio Project',
    software: ['Cinema 4D', 'Octane'], description: 'Watch product animation.',
    thumbnail: '',          videoUrl: V3('Omega_Final.mp4'),        poster: '',
    tags: ['3D Animation', 'Watch'], year: 2024,
  },
  {
    id: 'oxyshred',         title: 'OxyShred Commercial',
    category: 'animation',  client: 'OxyShred',
    software: ['Cinema 4D', 'Redshift'], description: 'Supplement product commercial animation.',
    thumbnail: '',          videoUrl: V3('Oxyshred Comm.MP4'),      poster: '',
    tags: ['3D Animation', 'Commercial'], year: 2024,
  },
  {
    id: 'peel-anim',        title: 'PEEL Commercial',
    category: 'animation',  client: 'PEEL',
    software: ['Blender', 'Cinema 4D'], description: '3D product commercial.',
    thumbnail: '',          videoUrl: V3('PEEL Anim Comm.MOV'),     poster: '',
    tags: ['3D Animation', 'Product'], year: 2024,
  },
  {
    id: 'rayhaan-v2',       title: 'Rayhaan Perfume V2',
    category: 'animation',  client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Perfume commercial 3D animation v2.',
    thumbnail: '',          videoUrl: V3('rayhaan perfume commercial V2 - Copy.mp4'), poster: '',
    tags: ['3D Animation', 'Perfume'], year: 2024,
  },
  {
    id: 'rayhaan-product',  title: 'Rayhaan 3D Product',
    category: 'animation',  client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Full 3D product animation.',
    thumbnail: '',          videoUrl: V3('Rayhaan Perfumes 3D PRODUCT ANIMATION.MP4'), poster: '',
    tags: ['3D Animation', 'Perfume'], year: 2024,
  },
  {
    id: 'rayhaan',          title: 'Rayhaan',
    category: 'animation',  client: 'Rayhaan',
    software: ['Cinema 4D', 'Octane'], description: 'Rayhaan brand 3D commercial.',
    thumbnail: '',          videoUrl: V3('Rayhaan.MP4'),            poster: '',
    tags: ['3D Animation', 'Brand'], year: 2024,
  },
  {
    id: 'revolt-card',      title: 'Revolt Card',
    category: 'animation',  client: 'Revolt',
    software: ['Cinema 4D', 'Redshift'], description: 'Fintech card product animation.',
    thumbnail: '',          videoUrl: V3('Revolt Card Anim.MOV'),   poster: '',
    tags: ['3D Animation', 'Fintech'], year: 2024,
  },
  {
    id: 'steam-deck',       title: 'Steam Deck',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender'], description: 'Gaming device product animation.',
    thumbnail: '',          videoUrl: V3('Steam deck done.mp4'),    poster: '',
    tags: ['3D Animation', 'Gaming'], year: 2024,
  },
  {
    id: 'tellmi',           title: 'Tellmi Animation',
    category: 'animation',  client: 'Tellmi',
    software: ['Cinema 4D', 'Octane'], description: '3D animation for Tellmi brand.',
    thumbnail: '',          videoUrl: V3('Tellmi Anim.MOV'),        poster: '',
    tags: ['3D Animation', 'Brand'], year: 2024,
  },
  {
    id: 'water-sim',        title: 'Water Simulation',
    category: 'animation',  client: 'Studio Project',
    software: ['Blender'], description: 'Fluid simulation animation.',
    thumbnail: '',          videoUrl: V3('Water Sim.MOV'),          poster: '',
    tags: ['3D Animation', 'Simulation'], year: 2024,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1', name: 'Rahul Mehta', role: 'Founder', company: 'Flow IQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    text: "Arnav transformed our product vision into a video users instantly connected with. We saw a 40% uplift in signups.",
    rating: 5, isVideo: true, videoUrl: MOTION.flowIq,
  },
  {
    id: 't2', name: 'Priya Nair', role: 'Marketing Lead', company: 'Cred',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&q=80',
    text: "He engineers emotion. The Cred video felt premium in a way we'd never achieved before.",
    rating: 5, isVideo: true, videoUrl: MOTION.credApp,
  },
  {
    id: 't3', name: 'Siddharth Rao', role: 'Head of Growth', company: 'Parcel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    text: 'The multi-token explainer has become our most-shared piece of content by a huge margin.',
    rating: 5, isVideo: true, videoUrl: MOTION.parcelMulti,
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
