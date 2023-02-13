import { Route, Routes } from 'react-router-dom'
import { DeafultLayout } from '../layouts/DefaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DeafultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
