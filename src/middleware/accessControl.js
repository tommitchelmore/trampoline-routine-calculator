export default {
  isSignedIn: async (req, res, next) => {
    if (!req.session || !req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    return next();
  },
  isContributor: async (req, res, next) => {
    if (!req.session || !req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!(req.session.user.role === 'contributor' || req.session.user.role === 'admin')) return res.status(403).json({ message: 'Forbidden' });
    return next();
  },
  isAdmin: async (req, res, next) => {
    if (!req.session || !req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!(req.session.user.role === 'admin' || req.session.user.role === 'contributor')) return res.status(403).json({ message: 'Forbidden' });
    return next();
  }
}