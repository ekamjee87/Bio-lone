import ExpertCollections from "./ExpertCollections";
import WhatsNew from "./WhatsNew";
import AnatomyModels from "./AnatomyModels";
import ImageCarousel from "./ImageCarousel";

// Placeholder data for Carousels
const FEATURED_ITEMS = [
  { id: 1, title: "Heart Anatomy", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=80" },
  { id: 2, title: "Cellular Structure", img: "https://images.unsplash.com/photo-1530213786676-4c4c64391e6b?w=400&q=80" },
  { id: 3, title: "Surgical Procedure", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80" },
  { id: 4, title: "Joint Analysis", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80" },
  { id: 5, title: "Respiratory System", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80" },
];

const GUIDED_JOURNEYS = [
  { id: 1, title: "Breast Cancer", subtitle: "Pathology and Treatment Options", img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80" },
  { id: 2, title: "Breast Cancer", subtitle: "Diagnostic Imaging", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" },
  { id: 3, title: "Neurological Disorders", subtitle: "Brain Mapping", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80" },
];

const ANATOMY_QUIZZES = [
  { id: 1, title: "Neutral Valves", img: "https://cdn-icons-png.flaticon.com/512/2854/2854082.png" },
  { id: 2, title: "Spine Vertebrae", img: "https://cdn-icons-png.flaticon.com/512/3024/3024508.png" },
  { id: 3, title: "Symmetry System", img: "https://cdn-icons-png.flaticon.com/512/2753/2753556.png" },
  { id: 4, title: "Brain Anatomy", img: "https://cdn-icons-png.flaticon.com/512/2854/2854125.png" },
  { id: 5, title: "Lung Pathways", img: "https://cdn-icons-png.flaticon.com/512/3024/3024467.png" },
];

export default function DashboardGrid() {
  return (
    <div className="w-full flex flex-col gap-12 md:gap-16">
      <ExpertCollections />
      <WhatsNew />
      <AnatomyModels />
      <ImageCarousel title="Featured" items={FEATURED_ITEMS} type="featured" />
      <ImageCarousel title="Guided Journeys" items={GUIDED_JOURNEYS} type="journeys" />
      <ImageCarousel title="Anatomy Quizzes" items={ANATOMY_QUIZZES} type="quizzes" />
    </div>
  );
}
