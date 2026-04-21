import { redirect } from 'next/navigation';

// Root now routes to the revenue wedge (AI Opportunity Assessment).
// Workshop page is still reachable directly at /workshops for any
// inbound links from the April 2 launch + ongoing workshop SEO.
export default function Home() {
  redirect('/assessment');
}
