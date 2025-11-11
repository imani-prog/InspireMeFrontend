import React from 'react'
import { 
  Sparkles, 
  RefreshCw, 
  Save, 
  PenLine, 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  Check, 
  MessageCircle, 
  Star,
  X,
  Plus,
  Trash2,
  MessageSquare,
  Loader2,
  Inbox
} from 'lucide-react'

// Wrapper components for consistent styling across the app
export const SparklesIcon = ({ className = "w-6 h-6", ...props }) => (
  <Sparkles className={className} {...props} />
)

export const RefreshIcon = ({ className = "w-6 h-6", ...props }) => (
  <RefreshCw className={className} {...props} />
)

export const SaveIcon = ({ className = "w-6 h-6", ...props }) => (
  <Save className={className} {...props} />
)

export const PenIcon = ({ className = "w-6 h-6", ...props }) => (
  <PenLine className={className} {...props} />
)

export const BookIcon = ({ className = "w-6 h-6", ...props }) => (
  <BookOpen className={className} {...props} />
)

export const HeartIcon = ({ className = "w-6 h-6", ...props }) => (
  <Heart className={className} {...props} />
)

export const AlertIcon = ({ className = "w-6 h-6", ...props }) => (
  <AlertTriangle className={className} {...props} />
)

export const CheckIcon = ({ className = "w-6 h-6", ...props }) => (
  <Check className={className} {...props} />
)

export const MessageIcon = ({ className = "w-6 h-6", ...props }) => (
  <MessageCircle className={className} {...props} />
)

export const StarIcon = ({ className = "w-6 h-6", ...props }) => (
  <Star className={className} {...props} />
)

export const CloseIcon = ({ className = "w-6 h-6", ...props }) => (
  <X className={className} {...props} />
)

export const PlusIcon = ({ className = "w-6 h-6", ...props }) => (
  <Plus className={className} {...props} />
)

export const TrashIcon = ({ className = "w-6 h-6", ...props }) => (
  <Trash2 className={className} {...props} />
)

export const QuoteIcon = ({ className = "w-6 h-6", ...props }) => (
  <MessageSquare className={className} {...props} />
)

export const LoaderIcon = ({ className = "w-6 h-6", ...props }) => (
  <Loader2 className={className} {...props} />
)

export const InboxIcon = ({ className = "w-6 h-6", ...props }) => (
  <Inbox className={className} {...props} />
)
