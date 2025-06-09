import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Edit, 
  MapPin, 
  Building, 
  Calendar, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Award,
  Briefcase
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { EditProfileModal } from "../components/profile/EditProfileModal";

function Profile() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-12 text-white relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {user.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                {user.jobTitle && (
                  <p className="text-xl text-violet-100 mb-2">{user.jobTitle}</p>
                )}
                {user.company && (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-violet-200 mb-2">
                    <Building className="w-4 h-4" />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-violet-200 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2 text-violet-200">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(user.joinedAt)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                {user.bio && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">About</h2>
                    <p className="text-slate-600 leading-relaxed">{user.bio}</p>
                  </section>
                )}

                {/* Skills Section */}
                {user.skills && user.skills.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects Section */}
                {user.projects && user.projects.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Projects</h2>
                    <div className="grid gap-4">
                      {user.projects.map((project, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {project.title}
                              </h3>
                              <p className="text-slate-600 mb-3">{project.description}</p>
                            </div>
                            {project.image && (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-16 h-16 rounded-lg object-cover ml-4"
                              />
                            )}
                          </div>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Project
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Achievements Section */}
                {user.achievements && user.achievements.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Achievements</h2>
                    <div className="space-y-4">
                      {user.achievements.map((achievement, index) => (
                        <div key={index} className="border-l-4 border-violet-500 pl-4">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {achievement.title}
                          </h3>
                          <p className="text-slate-600 mb-2">{achievement.description}</p>
                          <p className="text-sm text-slate-500">
                            {formatDate(achievement.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                        📧
                      </div>
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Social Links</h3>
                    <div className="space-y-3">
                      {Object.entries(user.socialLinks).map(([platform, url]) => {
                        if (!url) return null;
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-slate-600 hover:text-violet-600 transition-colors"
                          >
                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                              {getSocialIcon(platform)}
                            </div>
                            <span className="text-sm capitalize">{platform}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Skills</span>
                      <span className="font-semibold">{user.skills?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Projects</span>
                      <span className="font-semibold">{user.projects?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Achievements</span>
                      <span className="font-semibold">{user.achievements?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

export default Profile;