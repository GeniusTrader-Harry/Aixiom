import { FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments, FaProjectDiagram } from 'react-icons/fa'

// Icons mirror the public Courses page, matched to the catalogue order.
export const courseIcons = [FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments, FaProjectDiagram]

// Stable key for a catalogue course (AP has no slug on the public site).
export const courseKey = (course) => course.slug || 'ap'

// Map a material's subject_id (e.g. 'alevel-econ', 'pf-debate') to a course key,
// so materials slot under the right course section. 'other' catches anything
// that doesn't match a course we list.
export function courseKeyForSubject(subjectId) {
  if (!subjectId) return 'other'
  const s = subjectId.toLowerCase()
  if (s.startsWith('alevel')) return 'alevel'
  if (s.startsWith('igcse')) return 'igcse'
  if (s.startsWith('ap')) return 'ap'
  if (s.startsWith('ielts')) return 'ielts'
  if (s.includes('debate') || s.startsWith('pf')) return 'pfdebate'
  if (s.startsWith('epq')) return 'epq'
  return 'other'
}

// Group a flat list of materials into a { courseKey: material[] } map.
export function groupMaterialsByCourse(materials) {
  const map = {}
  for (const m of materials) {
    const k = courseKeyForSubject(m.subject_id)
    ;(map[k] ||= []).push(m)
  }
  return map
}
