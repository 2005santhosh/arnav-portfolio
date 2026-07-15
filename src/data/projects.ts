const CLOUD = 'dhsyiussw'
const CL    = `https://res.cloudinary.com/${CLOUD}`

// Generate a fast poster (first frame JPEG, 400px wide, auto quality)
// from a full Cloudinary video URL like https://res.cloudinary.com/x/video/upload/v123/id.mp4
const toPoster = (url: string) =>
  url.replace('/video/upload/', '/video/upload/so_0,w_400,f_jpg,q_auto:good/')
     .replace(/\.(mp4|mov|MOV|MP4)$/i, '.jpg')

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

// ── Motion Graphics Cloudinary URLs ──────────────────────
const MV = {
  aiCadence:   `${CL}/video/upload/v1784101213/AI_Cadence_ipgzwx.mp4`,
  credApp:     `${CL}/video/upload/v1784101204/Cred_app_tvxkyc.mp4`,
  vmgDigital:  `${CL}/video/upload/v1784101244/VMG_DIGITAL_nax3ct.mp4`,
  flowIq:      `${CL}/video/upload/v1784101304/Flow_IQ_pulkkm.mp4`,
  scheduleIq:  `${CL}/video/upload/v1784101241/Schedule_IQ_gn49iu.mp4`,
  parcelMulti: `${CL}/video/upload/v1784101220/Parcel_multi-token_rh42xs.mp4`,
  parcelNotif: `${CL}/video/upload/v1784101248/Parcel_-_Notification_yiggkf.mp4`,
  crizpoV2:    `${CL}/video/upload/v1784101267/Crizpo_ver-2_qqaehm.mp4`,
  crizpo9x16:  `${CL}/video/upload/v1784101268/crizpo_v2-2_9x16_d66n7k.mp4`,
  prospectIq:  `${CL}/video/upload/v1784101227/prospect-iq-crm-app-product-update-video_1-prospect-iq-crm-app-product-update-video_jklk9x.mp4`,
  reel:        `${CL}/video/upload/v1784101225/3179100155_jnruf1.mp4`,
}

// ── 3D Animation Cloudinary URLs ─────────────────────────
const AV = {
  bandJewellery: `${CL}/video/upload/v1784101551/Band_3d_Jewellery_Anim_COmm_lqneh2.mov`,
  cytoLife:      `${CL}/video/upload/v1784101541/CytoLife_Anim_Comm_rnw94n.mov`,
  doneBeauty:    `${CL}/video/upload/v1784101534/Done_Beauty_1920x1080_n9uxic.mp4`,
  clothSim:      `${CL}/video/upload/v1784101519/Cloth_Sim_Ukraine_z9yac6.mov`,
  waterSim:      `${CL}/video/upload/v1784101513/Water_Sim_yecdki.mov`,
  rayhaanV2:     `${CL}/video/upload/v1784101500/rayhaan_perfume_commercial_V2_-_Copy_yh5xg5.mp4`,
  rayhaanProduct:`${CL}/video/upload/v1784101479/Rayhaan_Perfumes_3D_PRODUCT_ANIMATION_eg04ry.mp4`,
  revoltCard:    `${CL}/video/upload/v1784101475/Revolt_Card_Anim_aohxao.mov`,
  steamDeck:     `${CL}/video/upload/v1784101474/Steam_deck_done_auionp.mp4`,
  cameraDone:    `${CL}/video/upload/v1784101458/Camera_done_veapym.mp4`,
  tellmi:        `${CL}/video/upload/v1784101458/Tellmi_Anim_a0jsqq.mov`,
  peel:          `${CL}/video/upload/v1784101456/PEEL_Anim_Comm_rw3epk.mov`,
  moncler:       `${CL}/video/upload/v1784101432/Moncler_Comm_onwzfg.mov`,
  bagAnim:       `${CL}/video/upload/v1784101406/BaG_Anim_Comm_teslrx.mov`,
  rayhaan:       `${CL}/video/upload/v1784101387/Rayhaan_bzgg0e.mp4`,
  oxyshred:      `${CL}/video/upload/v1784101353/Oxyshred_Comm_irepzp.mp4`,
  bibliP:        `${CL}/video/upload/v1784101352/Bibli_P_dl2zcf.mov`,
}

export const projects: Project[] = [
  // ── Motion Graphics ──────────────────────────────────
  { id: 'm1',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.aiCadence,   poster: toPoster(MV.aiCadence),   tags: [], year: 2024, featured: true },
  { id: 'm2',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.credApp,     poster: toPoster(MV.credApp),     tags: [], year: 2024, featured: true },
  { id: 'm3',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.vmgDigital,  poster: toPoster(MV.vmgDigital),  tags: [], year: 2024, featured: true },
  { id: 'm4',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.flowIq,      poster: toPoster(MV.flowIq),      tags: [], year: 2024, featured: true },
  { id: 'm5',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.scheduleIq,  poster: toPoster(MV.scheduleIq),  tags: [], year: 2024, featured: true },
  { id: 'm6',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.parcelMulti, poster: toPoster(MV.parcelMulti), tags: [], year: 2023 },
  { id: 'm7',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.parcelNotif, poster: toPoster(MV.parcelNotif), tags: [], year: 2023 },
  { id: 'm8',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.crizpoV2,   poster: toPoster(MV.crizpoV2),   tags: [], year: 2023 },
  { id: 'm9',  title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.crizpo9x16, poster: toPoster(MV.crizpo9x16), tags: [], year: 2023 },
  { id: 'm10', title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.prospectIq,  poster: toPoster(MV.prospectIq),  tags: [], year: 2023 },
  { id: 'm11', title: '', category: 'motion', client: '', software: [], description: '', thumbnail: '', videoUrl: MV.reel,        poster: toPoster(MV.reel),        tags: [], year: 2024 },

  // ── 3D Animation ─────────────────────────────────────
  { id: 'a1',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.bagAnim,       poster: toPoster(AV.bagAnim),       tags: [], year: 2024 },
  { id: 'a2',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.bandJewellery, poster: toPoster(AV.bandJewellery), tags: [], year: 2024 },
  { id: 'a3',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.bibliP,        poster: toPoster(AV.bibliP),        tags: [], year: 2024 },
  { id: 'a4',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.cameraDone,    poster: toPoster(AV.cameraDone),    tags: [], year: 2024 },
  { id: 'a5',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.clothSim,      poster: toPoster(AV.clothSim),      tags: [], year: 2024 },
  { id: 'a6',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.cytoLife,      poster: toPoster(AV.cytoLife),      tags: [], year: 2024 },
  { id: 'a7',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.doneBeauty,    poster: toPoster(AV.doneBeauty),    tags: [], year: 2024 },
  { id: 'a8',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.moncler,       poster: toPoster(AV.moncler),       tags: [], year: 2024 },
  { id: 'a9',  title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.oxyshred,      poster: toPoster(AV.oxyshred),      tags: [], year: 2024 },
  { id: 'a10', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.peel,          poster: toPoster(AV.peel),          tags: [], year: 2024 },
  { id: 'a11', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.rayhaan,       poster: toPoster(AV.rayhaan),       tags: [], year: 2024 },
  { id: 'a12', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.rayhaanV2,     poster: toPoster(AV.rayhaanV2),     tags: [], year: 2024 },
  { id: 'a13', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.rayhaanProduct,poster: toPoster(AV.rayhaanProduct),tags: [], year: 2024 },
  { id: 'a14', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.revoltCard,    poster: toPoster(AV.revoltCard),    tags: [], year: 2024 },
  { id: 'a15', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.steamDeck,     poster: toPoster(AV.steamDeck),     tags: [], year: 2024 },
  { id: 'a16', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.tellmi,        poster: toPoster(AV.tellmi),        tags: [], year: 2024 },
  { id: 'a17', title: '', category: 'animation', client: '', software: [], description: '', thumbnail: '', videoUrl: AV.waterSim,      poster: toPoster(AV.waterSim),      tags: [], year: 2024 },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1', name: 'Rahul Mehta', role: 'Founder', company: 'Flow IQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    text: "Arnav transformed our product vision into a video users instantly connected with. We saw a 40% uplift in signups.",
    rating: 5, isVideo: true, videoUrl: MV.flowIq,
  },
  {
    id: 't2', name: 'Priya Nair', role: 'Marketing Lead', company: 'Cred',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&q=80',
    text: "He engineers emotion. The Cred video felt premium in a way we'd never achieved before.",
    rating: 5, isVideo: true, videoUrl: MV.credApp,
  },
  {
    id: 't3', name: 'Siddharth Rao', role: 'Head of Growth', company: 'Parcel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    text: 'The multi-token explainer has become our most-shared piece of content by a huge margin.',
    rating: 5, isVideo: true, videoUrl: MV.parcelMulti,
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
