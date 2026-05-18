import Breadcrumbs from '@/components/common/Breadcrumbs';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[
        { label: 'Mon Compte', href: '/account' },
        { label: 'Paramètres' },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Paramètres du Compte
      </h1>

      <div className="space-y-8">
        <section className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Informations Personnelles</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Prénom" placeholder="Votre prénom" />
            <Input label="Nom" placeholder="Votre nom" />
          </div>
          <Input label="Email" type="email" placeholder="votre@email.com" />
          <Input label="Téléphone" type="tel" placeholder="+226 XX XX XX XX" />
          <Button variant="primary">Sauvegarder</Button>
        </section>

        <section className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Changer le Mot de Passe</h2>
          <Input label="Mot de passe actuel" type="password" />
          <Input label="Nouveau mot de passe" type="password" />
          <Input label="Confirmer le nouveau mot de passe" type="password" />
          <Button variant="primary">Mettre à jour</Button>
        </section>
      </div>
    </div>
  );
}
